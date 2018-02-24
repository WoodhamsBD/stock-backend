const express = require('express');
const router = express.router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// Rouetes for User

// Sign up
router.post('/signup', function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    // PW error and hashing/ init save
    if(err) {
      return res.status(500).json({
        error: err
      });
    }
    else {
      // Create user
      const user = new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        password: hash
      });
      // Now save and response with status
      user.save().then(function(result) {
        console.log(result);
        res.status(200).json({
          success: "New user created"
        });
      }).catch(error => {
        res.status(500).json({
          error: err
        });
      });
    }
  });
});

// Export router
module.exports = router;