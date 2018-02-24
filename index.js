// Requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Start up port
const port = 3000;

// MongoDB 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jwtauth')

// middleware for response parsing
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Start up
app.listen(port, function() {
  console.log("Listening on port: " + port);
})

app.get('/checking', function(req, res) {
  res.json({
    "Tutorial": "JWT runthrough"
  });
});

