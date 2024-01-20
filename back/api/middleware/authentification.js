const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authentification = async(req, res, next) => {
	try {
		const authToken = req.header('Authorization').replace('Bearer', '').trim();
		const decodedToken = jwt.verify(authToken, process.env.TOKEN_SECRET);
		const user = await User.findOne({_id: decodedToken._id, 'authTokens.authToken': authToken});
		if (!user) throw new Error();
		req.authToken= authToken;
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({
			message: 'Merci de vous authentifier !'
		});
	}
};

module.exports= authentification;