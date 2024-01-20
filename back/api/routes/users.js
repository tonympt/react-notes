const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const APIerror = require('../services/error/APIerror');
const authentification = require('../middleware/authentification');


router.post('/sign-up', async (req, res, next) => {
	const {firstName, lastName, email, password, darkMode = false, labels = []} = req.body;
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		firstName,
		lastName,
		email,
		password,
		darkMode,
		labels,
	});
	try {
		const authToken= await user.generateAuthTokenAndSaveUser();
		res.status(201).json({
			message: 'Your account has been created successfully 🎉!',
			firstName: user.firstName,
			authToken: authToken
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});


router.post('/login', async (req, res, next)=>{
	const {email, password} = req.body;
	try {
		const user = await User.findUser(email, password);
		const authToken= await user.generateAuthTokenAndSaveUser();
		res.status(200).json({
			authToken: authToken
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});


router.post('/logout', authentification, async (req, res, next)=>{
	try {
		req.user.authTokens = req.user.authTokens.filter((authToken)=> {
			return authToken.authToken !== req.authToken;
		});
		await req.user.save();
		res.status(200).json({
			message: 'You have been disconnected ! '
		});
	} catch (err) {
		next(new APIerror(err.message, 500));
	}
});

router.post('/logout/all', authentification, async (req, res, next)=>{
	try {
		req.user.authTokens = [];
		await req.user.save();
		res.status(200).json({
			message: 'You have been disconnected from all your devices ! '
		});
	} catch (err) {
		next(new APIerror(err.message, 500));
	}
});

router.get('/me', authentification, async (req, res, next)=>{
	try {
		res.status(200).json({
			email: req.user.email,
			firstName: req.user.firstName,
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}

});

router.delete('/me', authentification, async (req, res, next)=>{
	try {
		console.log(req.user);
		await req.user.deleteOne();
		res.status(200).json({
			message: 'Your account has been deleted 😢!'
		});
	} catch (err) {
		console.log(err);
		next(new APIerror(err.message, 500));
	}
});

module.exports = router;