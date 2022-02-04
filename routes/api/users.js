const express = require('express');
const router = express.Router();
const path = require('path');
const { getUsers } = require('../../models/users.js');

router
  .route('/')
  .get((req, res) => {
    res.json(getUsers());
  })
  .post((req, res) => {
    res.json({
      email: req.body.email,
      password: req.body.password,
    });
  });

module.exports = router;
