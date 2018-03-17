const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

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

//Routing
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});