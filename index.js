const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const expresshdls = require('express-handlebars');

//  CONFIG TEMPLATE ENGINE
app.engine('hbs', expresshdls({ extname: '.hbs' }));
app.set('view engine', 'hbs');

//ROUTES
const getRoute = require('./routes/getRoute');
const postRoute = require('./routes/postRoute');

// SERVING STATIC FILES
app.use(express.static('public'));

// GET REQUEST HANDLER
app.use(getRoute);

// POST REQUEST HANDLER
app.use(postRoute);

// START SERVER
app.listen(port, () => {
	console.log('server started on port ' + port);
});
