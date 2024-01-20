const express = require('express');
const router = express.Router();
const Label = require('../models/label');
const User = require('../models/user');
const mongoose = require('mongoose');
const authentification = require('../middleware/authentification');
const APIerror = require('../services/error/APIerror');

router.get('/labels', authentification, async (req, res, next) => {
	const userId = req.user._id;
	try {
		const userLabels = await User.findById(userId)
			.populate('labels');
		if (!userLabels || userLabels.length === 0) {
			return res.status(200).json({
				message: 'No label has been created yet 🏷️!'
			});
		}	
		res.status(200).json({
			labels: userLabels.labels
		});
	} catch (err) {
		console.log(err);
		next(new APIerror('Internal Server Error', 500));
	}
});

router.post('/label', authentification, async (req, res, next) => {
	const {labelName} = req.body;
	let user = req.user;
	const label = new Label({
		_id: new mongoose.Types.ObjectId(),
		labelName,
	});
	try {
		user.labels.push(label._id);
		await label.save();
		await user.save();
		user = await User.findById(user._id)
			.populate('labels');

		res.status(201).json({
			message: 'Label created successfully 🏷️!',
			labels : user.labels
		});
	} catch (err) {
		console.log(err);
		next(new APIerror('Internal Server Error', 500));
	}
});

router.patch('/label/:labelId', authentification, async (req, res, next) => {
	const labelId = req.params.labelId;
	const labelName = req.body.labelName;
	try {
		const label = await Label.findById(labelId);
		if (!label) {
			next(new APIerror('No labels found 🏷️!', 500));
		}
		label.labelName = labelName;
		await label.save();
		res.status(200).json({
			message: 'Labels updated 🏷️!',
		});
	} catch (err) {
		console.log(err);
		next(new APIerror('Internal Server Error', 500));
	}
});

router.delete('/label/:labelId', async (req, res, next) => {
	const id = req.params.labelId;
	try {
		await Label.deleteOne({ _id: id }).exec();
		res.status(200).json({
			message: 'Label has been removed 🗑️!',
		});
	} catch (err) {
		console.log(err);
		next(new APIerror('Internal Server Error', 500));
	}
});


module.exports = router;
