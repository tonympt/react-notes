const mongoose = require('mongoose');
const User = require('./user');

const itemSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	text: {
		type: String,
	},
	isCompleted: {
		type: Boolean, 
		required: true
	},
});

const noteSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { 
		type: String, 
	},
	color: { 
		type: String, 
		required: true,
		enum: {
			values: ['bg-white', 'bg-red-200', 'bg-orange-200', 'bg-amber-200', 'bg-lime-200', 'bg-emerald-200', 'bg-slate-200', 'bg-cyan-200', 'bg-purple-200'],
			message: '{VALUE} is not authorised !'
		}
	},
	position: { 
		type: Number, 
		required: true
	},
	isCheckBoxMode: { 
		type: Boolean,
		required: true
	},
	isPinned: {
		type:Boolean,
		required: true,
	},
	isArchived: {
		type:Boolean,
		required: true,
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	labels: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Label'
		}],
	},
	items: [itemSchema]
}, {timestamps: true });

noteSchema.pre('deleteOne', async function() {
	try {
		await User.updateOne(
			{ notes: this.getFilter()._id },
			{ $pull: { notes: this.getFilter()._id } }
		);
	} catch (error) {
		console.error('Is not authorised', error);
	}
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;