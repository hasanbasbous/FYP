const uuid = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const HttpError = require('../models/http-error');

// const DUMMY_USERS = [
// 	{
// 		id: 'u1',
// 		name: 'hasan basbous',
// 		email: 'test@test.com',
// 		password: 'test',
// 	},
// ];

const signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data', 422)
		);
	}
	const { name, email, password } = req.body;
	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			'Signing up failed, pleast try again later',
			500
		);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError(
			'User exists already, please login instead',
			422
		);
		return next(error);
	}

	const createdUser = new User({
		name,
		email,
		password,
	});

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError('Signing up failed, please try again.', 500);
		return next(error);
	}
	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			'Logging in failed, pleast try again later',
			500
		);
		return next(error);
	}

	if (!existingUser || existingUser.password !== password) {
		const error = new HttpError(
			'Invalid credentials, could not log you in',
			401
		);
		return next(error);
	}

	res.json({ message: 'Logged in' });
};

const getUsers = (req, res, next) => {
	res.json({ users: DUMMY_USERS });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
