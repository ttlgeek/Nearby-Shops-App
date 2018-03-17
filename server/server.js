const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Establish Database Connection
mongoose.connect(config.database);

//When Connected to database
mongoose.connection.on('connected', () =>{
	console.log('Connected to database: ' + config.database);
});

//When Error is raised
mongoose.connection.on('error', (error) =>{
	console.log('Database error: ' + error);
});

const app = express();

const users = require('./routes/users');

// Port Configuration
const port = process.env.PORT || 1337

// Start server
app.listen(port, () => {
	console.log('Server started on Port: ' + port);
});

// Add CORS Middleware
app.use(cors())

// Add Body Parser Middleware
app.use(bodyParser.json())

// Add Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.use('/users', users);

//Routing
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});