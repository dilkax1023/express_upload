const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://localhost:27017/upload',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	err => {
		if (err) {
			console.log('Something went wrong', err);
		} else {
			console.log('we are successfully conncted');
		}
	}
);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true,
	},
	firstname: String,
	surname: String,
	profilePicture: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
