const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const errorModule =require('./api/services/error/errorHandling');

mongoose.connect(`mongodb+srv://dbAdmin:${process.env.MONGO_ATLAS_PW}@cluster0.viz7txe.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

const userRoutes = require('./api/routes/users');
const noteRoutes = require('./api/routes/notes');
const labelRoutes = require('./api/routes/labels');

// Routes which should handle requests
app.use('/user', userRoutes);
app.use('/notes', noteRoutes);
app.use('/', labelRoutes);


app.use(errorModule._404);
app.use(errorModule.manage);

module.exports = app;