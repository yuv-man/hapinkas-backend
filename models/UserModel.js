const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		validate(value) {
			if (value.length < 2) throw new Error('user name is invalid');
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		validate(value) {
			if (value.length < 6 || value.length > 100) throw new Error('password is invalid');
		},
	},
	profileImage: {
		type: String,
		required: false,
	},
	cloudinaryId: {
		type: String,
		required: false,
	},
	myEvents: {
		type: Array,
		required: true,
		default: 0,
	},
    events: {
		type: Array,
		required: true,
		default: 0,
	},
    points: {
        type: Number,
        required: true,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
