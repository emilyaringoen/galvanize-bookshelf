'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')
const humps = require('humps')
const bcrypt = require('bcrypt')

router.get('/token', (req, res, next) => {
  res.send(false)
})

// router.post('/token', (req, res, next) => {
//   console.log(req.body);
//   // if (!req.body)
//   //
//   // knex('token')
//   //   .returning(['id', 'email'])
//   //   .insert({
//   //     id: req.body.id,
//   //     email: req.body.email,
//   //     token: bcrypt.hashSync(req.body.password, 8)
//   //   }).then((user) => {
//   //     console.log(user[0]);
//   //     res.send(humps.camelizeKeys(user[0]))
//   //   })
//   res.end()
// })


module.exports = router;
