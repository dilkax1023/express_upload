const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const User = require('../models/db');
const helpers = require('../helpers');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/');
	},

	// By default, multer removes file extensions so let's add them back
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

router.post('/upload', (req, res) => {
	let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('picture');

	upload(req, res, function (err) {
		// req.file contains information of uploaded file
		// req.body contains information of text fields, if there were any

		if (req.fileValidationError) {
			return res.send(req.fileValidationError);
		} else if (!req.file) {
			return res.send('Please select an image to upload');
		} else if (err instanceof multer.MulterError) {
			return res.send(err);
		} else if (err) {
			return res.send(err);
		}
		const profilePicture = req.file.path.replace('public', '');
		const username = req.body.username;

		const user = new User({
			username,
			profilePicture,
		});

		user.save(err => {
			if (err) {
				console.log('DB NOT CONNECTED', err);
				return;
			}
			res.send(`You have uploaded this image ${profilePicture}`);
		});
	});
});

module.exports = router;
