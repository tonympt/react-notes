const mongoose = require('mongoose');
const User = require('./user');

/**
 * Schema for Label model. Defines the structure for label documents in the database.
 * @type {mongoose.Schema}
 */
const labelSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	labelName: {
		type: String, 
		required: true,
		maxlength: [20, 'Labels are limited to 20 characters !']
	},
}, {timestamps: true });

/**
 * Pre-hook for the 'deleteOne' method on labelSchema.
 * Ensures that when a label is deleted, it is also removed from any associated User documents.
 * @throws Will throw an error if the update operation fails.
 */
labelSchema.pre('deleteOne', async function() {
	try {
		await User.updateOne(
			{ labels: this.getFilter()._id },
			{ $pull: { labels: this.getFilter()._id } }
		);
	} catch (error) {
		console.error('An error occurred while deleting the label :', error);
	}
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;
