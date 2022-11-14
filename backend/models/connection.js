const uuidv4 = require('uuid');
const User = require('../models/user');
const Crash = require('../models/crash');
const HttpError = require('../models/http-error');

const messages = new Set();
const users = new Map();

const defaultUser = {
	id: 'anon',
	name: 'Anonymous',
};

const messageExpirationTimeMS = 5 * 60 * 1000;

// User.watch().on('change', (data) => console.log(data));

const userController = require('../controllers/crash-controllers');
const crashController = require('../controllers/crash-controllers');

class Connection {
	constructor(io, socket) {
		this.socket = socket;
		this.io = io;
		// const changeStream = User.watch({ fullDocument: 'updateLookup' });
		let pipeline = { $match: { operationType: 'insert' } };
		Crash.watch({ fullDocument: 'updateLookup' }).on('change', (data) => {
			// let res = JSON.stringify(data);
			socket.emit(
				'receiveGreet',
				{ data: JSON.stringify(data.fullDocument) },
				(error) => {
					console.log('error::', error);
				}
			);
		});
		// socket.on('getMessages', () => this.getMessages());
		// socket.on('message', (value) => this.handleMessage(value));
		// socket.on('disconnect', () => this.disconnect());
		// socket.on('connect_error', (err) => {
		// 	console.log(`connect_error due to ${err.message}`);
		// });
	}

	// sendMessage(message) {
	// 	this.io.sockets.emit('message', message);
	// }

	// getMessages() {
	// 	messages.forEach((message) => this.sendMessage(message));
	// }

	// handleMessage(value) {
	// 	const message = {
	// 		id: uuidv4.v4(),
	// 		user: users.get(this.socket) || defaultUser,
	// 		value,
	// 		time: Date.now(),
	// 	};

	// 	messages.add(message);
	// 	this.sendMessage(message);

	// 	setTimeout(() => {
	// 		messages.delete(message);
	// 		this.io.sockets.emit('deleteMessage', message.id);
	// 	}, messageExpirationTimeMS);
	// }

	// disconnect() {
	// 	users.delete(this.socket);
	// }
}

function chat(io) {
	io.on('connection', (socket) => {
		new Connection(io, socket);
	});
}

module.exports = chat;
