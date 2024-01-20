const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APIError = require('../services/error/APIerror');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {
		type: String, 
		required: true
	},
	lastName: {
		type: String, 
		required: true
	},
	email: {
		type: String, 
		required: true,
		unique : true,
		lowerwase: true,
		trim: true,
		validate: {
			validator: function(v) {
				return validator.isEmail(v);
			},
			message: 'Invalid email !'
		}
	},
	password: {
		type: String, 
		required: true,
		validate: {
			validator: function(v) {
				return validator.isStrongPassword(v);
			},
			message: 'Invalid password: 8 characters minimum including 1 uppercase, 1 lowercase, 1 number and 1 symbol !'
		}
	},
	darkMode: {
		type: Boolean, 
		required: true
	},
	notes:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Note',
	}],
	labels:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Label',
	}],
	authTokens: [{
		authToken:{
			type: String,
			required: true,
		}
	}]
}, {timestamps: true });


userSchema.statics.findUser = async(email, password) => {
	const user = await User.findOne({email});
	if(!user) throw new APIError('Unable to log in, invalid email or password !', 400);
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if(!isPasswordValid) throw new APIError('Unable to log in, invalid email or password !', 400);
	return user;
};

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
	const user = this;
	const authToken = jwt.sign({_id: user._id.toString()}, process.env.TOKEN_SECRET);
	user.authTokens.push({authToken});
	await user.save();
	return authToken;
};

userSchema.pre('save', async function(){
	const user = this;
	// compare email in database before save method
	if(user.isModified('email')){
		const existingUser = await User.findOne({ email: user.email });
		if (existingUser) {
			throw new APIError('This email is already in use !', 409);
		}
	}
	// encrypt password before save method
	if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
});

userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
	const Note = require('./note');
	const Label = require('./label');
	const user = this;
	try {
		// Delete notes and labels associated with the user
		await Note.deleteMany({ _id: { $in: user.notes } });
		await Label.deleteMany({ _id: { $in: user.labels } });
	} catch (error) {
		console.log(error);
		next(new APIError('An error occurred while deleting user data !', 500));
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
