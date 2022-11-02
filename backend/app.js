const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const parkLotRoute = require('./routes/park-lot-routes');
const usersRoute = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // * any domain we can restric it to localhost:3000
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});

app.use('/api/parking', parkLotRoute);
app.use('/api/users', usersRoute);

app.use((req, res, next) => {
	return next(new HttpError('Could not found find this route', 404));
}); //this middleware is only reached if we have some request which didn't get a response

app.use((error, req, res, next) => {
	//error handling middleware
	if (res.headerSent) {
		return next(error);
	}
	//if you reached this middleware without a response holding error being sent
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occured!' });
});

mongoose
	.connect(
		'mongodb+srv://hasan:e6G5mlrfSf3JdCDu@cluster0.cokbf4f.mongodb.net/db?retryWrites=true&w=majority'
	)
	.then(() => {
		app.listen(5000);
	})
	.catch((err) => console.log(err));
