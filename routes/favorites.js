'use strict';

const express = require('express')
const router = express.Router()
const boom = require('boom')
const humps = require('humps')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const bcrypt = require('bcrypt')

router.get('/favorites', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .join('books', 'books.id', '=', 'favorites.book_id')
      .select("favorites.id", "favorites.book_id", "favorites.user_id", "books.title", "books.author", "books.genre", "books.description", "books.cover_url", "books.created_at", "books.updated_at")
      .then((data) => {
        res.send(humps.camelizeKeys(data))
      })
  }
})

router.get('/favorites/check', (req, res, id) => {
  knex('favorites')
    .where('book_id', req.query.bookId)
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send(true)
      } else {
        res.status(200).send(false)
      }
    })
})


module.exports = router;
