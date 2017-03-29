
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')
const humps = require('humps')
const bcrypt = require('bcrypt')
const boom = require('boom')

// YOUR CODE HERE

router.post('/users', (req, res, next) => {
  if (!req.body.email || req.body.email.trim() === '') {
    // return res.status(400)
    //           .set('Content-Type', 'text/plain')
    //           .send('Email must not be blank')
    return next(boom.create(400, 'Email must not be blank'))
  }
  if (!req.body.password || req.body.password.trim() === '') {
    // return res.status(400)
    //           .set('Content-Type', 'text/plain')
    //           .send('Password must be at least 8 characters long')
    return next(boom.create(400, 'Password must be at least 8 characters long'))

  }
  if (knex('users').where('email', req.body.email)) {
    // return res.status(400)
    //           .set('Content-Type', 'text/plain')
    //           .send('Email already exists')
    return next(boom.create(400, 'Email already exists'))
  }

  knex('users')
    .returning(['id', 'first_name', 'last_name', 'email'])
    .insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      hashed_password: bcrypt.hashSync(req.body.password, 8)
    }).then((user) => {
      console.log(user[0]);
      res.send(humps.camelizeKeys(user[0]))
    })
})


module.exports = router;
