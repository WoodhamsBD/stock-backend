// Requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user.route');

// Start up port
const PORT = 3000;

// MongoDB 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jwtauth')

// middleware for response parsing
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// GET verificationls
app.get('/checking', function(req, res) {
  res.json({
    "Tutorial": "JWT runthrough"
  });
});

// User routing
app.use('/user',user);

// Start up Verification
app.listen(PORT, function () {
  console.log("Listening on port: " + PORT);
})
