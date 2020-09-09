const express = require('express');
const router = express.Router();
const User = require('../models/db');

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/users/:id', (req, res) => {
	console.log('req.params:', req.params.id);
	const userId = req.params.id;
	User.findById(userId, (err, userInfo) => {
		if (err) {
			console.log('user not found', err);
			return;
		}
		const user = userInfo.toObject();
		console.log(user);
		res.render('profile', { user });
	});
});

module.exports = router;
