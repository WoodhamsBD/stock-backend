const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

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
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      // Now save and response with status
      user.save().then(function(result) {
        console.log(result);
        res.status(200).json({
          success: "New user created"
        });
        
        // Error catch 
      }).catch(error => {
        res.status(500).json({
          error: err
        });
      });
    }
  });
});

// Sign in
router.post('/signin', function(req, res) {
  // Lookup user by email index
  User.findOne({ email: req.body.email })
  .exec()
  // after user found compare password in body with user password in db
  .then(function(user) {
    bcrypt.compare(req.body.password, user.password, function( err, result) {
      // password !compare return error
      if(err) {
        return res.status(401).json({
          failed: "Unauthorized Acces"
        });
      }
      // password compare sign in
      if(result) {
        const JWTToken = jwt.sign({
          email: user.email,
          _id: user._id
        },
        'secret',
          {
            expiresIn: '2h'
          });
          return res.status(200).json({
            success: "Authorization Successful",
            token: JWTToken
          });
        }
      // any other compare result fail request
      return res.status(401).json({
        failed: "Unauthorized Acces"
      });
    });
  })
  // Error catch after compare
  .catch(error => {
    res.status(500).json({
      error: error
    });
  });
});

// Export router
module.exports = router;