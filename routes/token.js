'use strict'

const express = require('express')
const router = express.Router()
const humps = require('humps')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const boom = require('boom')
const cookie = require('cookie-session')
const jwt = require('jsonwebtoken');

let authenticationStatus = false;

router.get('/token', (req, res, next) => {
  res.send(authenticationStatus)
})

router.post('/token', (req, res, next) => {
  
})



module.exports = router;
