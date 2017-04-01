'use strict';

const express = require('express')
const router = express.Router()
const boom = require('boom')
const humps = require('humps')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const bcrypt = require('bcrypt')

router.get('/token', (req, res, next) => {
  if (!req.cookies.token) {
    res.status(200).send(false)
  } else {
    res.status(200).send(true)
  }
})

router.post('/token', (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
  knex('users')
    .where('email', email)
    .then((data) => {
      if (data.length > 0) {
        bcrypt.compare(password, data[0].hashed_password, (err, boolean) => {
          if (boolean) {
            let token = jwt.sign({ email: data[0].email, password: data[0].hashed_password}, "shhh");
            res.cookie('token', token, { httpOnly:true })
            delete data[0].hashed_password
            res.send(humps.camelizeKeys(data[0]))
          } else {
            next(boom.create(400, 'Bad email or password'))
          }
        })
      } else {
        next(boom.create(400, 'Bad email or password'))
      }
    })
})

router.delete('/token', (req, res, session) => {
  res.clearCookie('token')
  res.send(true)
})


module.exports = router;
