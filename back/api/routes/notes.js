const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');
const mongoose = require('mongoose');
const authentification = require('../middleware/authentification');
const APIerror = require('../services/error/APIerror');

router.get('/', authentification, async (req, res, next) => {
	const userId = req.user._id;
	try {
		// GET all notes by user id
		let userNotes = await User.findById(userId)
			.select('notes')
			.populate({
				path: 'notes',
				populate: [
					{ path: 'items'},
					{ path: 'labels' }
				]
			});
		// handle message if no notes have been created
		if (!userNotes || userNotes.notes.length === 0) {
			return res.status(200).json({
				message: 'No notes have been created yet📝!'
			});
		}
		userNotes.notes.sort((a, b) => a.position - b.position);
		const response = {
			notes: userNotes.notes
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});


router.get('/:noteId', async (req, res, next) => {
	const id = req.params.noteId;
	try {
		const note = await Note.findById(id)
			.populate('labels')
			.exec();
		if (note) {
			res.status(200).json({
				notes: note,
			});
		} else {
			next(new APIerror('No notes found 📝!', 404));
		}
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});

router.get('/:noteId/items', authentification, async (req, res, next) => {
	try {
		const note = await Note.findById(req.params.noteId);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}
		res.status(201).json({
			items: note.items,
		});
	} catch (err) {
		next(new APIerror(err.message, 500));
	}
});

router.post('/', authentification, async (req, res, next) => {
	const user = req.user;
	let itemsWithId = req.body.items.map(item => ({
		...item,
		_id: new mongoose.Types.ObjectId()
	}));
	const labels = req.body.labels;

	try {
		const userNotes = await User.findById(user._id).select('notes');
		if (userNotes.notes.length >= 10 ) {
			next(new APIerror('For the demo, note creation is limited to 10 notes !', 403));
			throw new Error('For the demo, note creation is limited to 10 notes !');
		}
		const lastPinnedNotePositionQuery = await Note.find({ user: user._id, isPinned: true })
			.sort({ position: -1 })
			.limit(1)
			.select({ position: 1 });

		// Ensure lastPinnedNotePosition is a number
		const lastPinnedNotePosition = lastPinnedNotePositionQuery[0]?.position || 0;
		const newPosition = req.body.isPinned ? 1 : lastPinnedNotePosition + 1;
		if (req.body.isPinned) {
			// Bulk increment positions
			await Note.updateMany({ user: user._id }, { $inc: { position: 1 } });
		} else {
			await Note.updateMany({ user: user._id, isPinned: false, position: { $gt: lastPinnedNotePosition } }, { $inc: { position: 1 } });
		}

		const note = new Note({
			_id: new mongoose.Types.ObjectId(),
			title: req.body.title,
			color: req.body.color,
			position: newPosition,
			isCheckBoxMode: req.body.isCheckBoxMode,
			isPinned: req.body.isPinned,
			items: itemsWithId,
			isArchived: false,
			user: user._id,
			labels: labels
		});

		user.notes.push(note._id);
		await note.save();
		await user.save();

		res.status(201).json({
			message: 'Note created successfully 🎉 !',
			note: note
		});
	} catch (err) {
		console.error(err.message);
		next(new APIerror(err.message, 500));
	}
});

router.post('/:noteId/items', authentification, async (req, res, next) => {
	try {
		const note = await Note.findById(req.params.noteId);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}
		const item = {
			_id: new mongoose.Types.ObjectId(),
			text: req.body.text,
			isCompleted: false,
		};
		note.items.push(item);
		await note.save();
		res.status(201).json({
			noteId: note._id,
		});
	} catch (err) {
		next(new APIerror(err.message, 500));
	}
});

router.patch('/:noteId/labels', authentification, async (req, res, next) => {
	const newLabels = req.body;
	const userLabels = req.user.labels;
	const noteId = req.params.noteId;
	try {
		// Check if all newLabels exist in userLabels
		const allLabelsValid = newLabels.every(label => userLabels.includes(label));
		if (!allLabelsValid) {
			next(new APIerror('One or more labels are not allowed 🏷️!', 404));
		}
		const note = await Note.findById(noteId);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}
		note.labels = newLabels;
		await note.save();
		res.status(201).json({
			message: 'Labels have been successfully updated 🏷️!'
		});
	} catch (err) {
		next(new APIerror(err.message, 500));
	}
});

router.patch('/:noteId', authentification, async (req, res, next) => {
	const noteId = req.params.noteId;
	const user = req.user;
	try {
		let note = await Note.findById(noteId);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}

		let isPinnedUpdated = false;
		for (const ops of req.body) {
			if (ops.propName && ops.value !== undefined) {
				note[ops.propName] = ops.value;
				if (ops.propName === 'isPinned') {
					isPinnedUpdated = true;
				}
			} else {
				next(new APIerror('Invalid request format!', 400));
			}
		}

		if (isPinnedUpdated) {
			let allNotes = await Note.find({ user: user._id }).sort('position');
			if (note.isPinned) {
				for (const otherNote of allNotes) {
					if (otherNote.id === note.id) {
						otherNote.position = 1;
					} else {
						otherNote.position++;
					}
					await otherNote.save();
				}
			} else {
				const lastPinnedNotePosition = allNotes.filter(n => n.isPinned).pop()?.position || 0;
				note.position = lastPinnedNotePosition + 1;
			}
		}

		await note.save();
		note = await Note.findById(noteId).populate('items').populate('labels');
		res.status(200).json({ message: 'Note updated!', note });
	} catch (err) {
		console.error(err);
		next(new APIerror(err.message, 500));
	}
});


router.patch('/:noteId/items/:itemId', authentification, async (req, res, next) => {
	const noteId = req.params.noteId;
	const itemId = req.params.itemId;
	try {
		// Find the note containing the item
		const note = await Note.findById(noteId);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}
		// Find the item within the note's items array
		const item = note.items.id(itemId);
		if (!item) {
			next(new APIerror('The note item was not found 📝!', 404));
		}
		// Update the note fields
		for (const ops of req.body) {
			if (ops.propName && ops.value !== undefined) {
				item[ops.propName] = ops.value;
			} else {
				next(new APIerror('Invalid request format!', 400));
			}
		}
		// Save the updated note
		await note.save();
		res.status(200).json({
			message: 'The item has been updated 🎉!',
			items: note.items,
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});

router.post('/sorted', authentification, async (req, res, next) => {
	const sortedNotPinnedNotes = req.body;
	// Optional: Add validation for sortedNotPinnedNotes here
	try {
		// Fetch only the IDs of the user's pinned notes
		const pinnedNoteIds = await Note.find({ user: req.user._id, isPinned: true })
			.select('_id')
			.lean(); // lean for performance improvement

		// Concatenate the IDs of the pinned notes with the sorted non-pinned note IDs
		const sortedNoteIds = [...pinnedNoteIds.map(note => note._id), ...sortedNotPinnedNotes.map(note => note._id)];

		// Prepare bulk update operations
		const bulkOps = sortedNoteIds.map((noteId, index) => ({
			updateOne: {
				filter: { _id: noteId },
				update: { position: index + 1 } // Assuming position starts at 1
			}
		}));
		// Perform bulk update
		await Note.bulkWrite(bulkOps);
		res.status(200).json({ message: 'Notes sorted successfully 🗂️' });
	} catch (err) {
		console.error(err);
		next(new APIerror(err.message, 500));
	}
});

router.delete('/:noteId', authentification, async (req, res, next) => {
	const id = req.params.noteId; 
	try {
		// Find the note by ID
		const note = await Note.findById(id);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}
		// delete note
		await note.deleteOne();
		res.status(200).json({
			message: 'The note has been deleted 🗑️!',
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});

router.delete('/:noteId/items/:itemId', async (req, res, next) => {
	const noteId = req.params.noteId;
	const itemId = req.params.itemId;
	try {
		// Find the note containing the item
		const note = await Note.findById(noteId);
		if (!note) {
			next(new APIerror('No notes found 📝!', 404));
		}
		// Find and remove the item from the note's items array
		const item = note.items.id(itemId);
		if (!item) {
			next(new APIerror('The note item was not found 📝!', 404));
		}
		// Remove the item from the note's items array
		note.items = note.items.filter(item => item._id.toString() !== itemId);
		await note.save();

		res.status(200).json({
			message: 'Item deleted 🗑️!',
			items: note.items,
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});

module.exports = router;