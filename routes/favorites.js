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

router.get('/favorites/check', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .where('book_id', req.query.bookId)
      .then((data) => {
        if (data.length > 0) {
          res.status(200).send(true)
        } else {
          res.status(200).send(false)
        }
      })
  }
})

router.post('/favorites', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .returning(['id', 'book_id', 'user_id'])
      .insert({
        book_id: req.body.bookId,
        user_id: 1
      }).then((fav) => {
        res.send(humps.camelizeKeys(fav[0]))
      })
  }
})

router.delete('/favorites', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .returning(['book_id', 'user_id'])
      .where('book_id', req.body.bookId)
      .del()
      .then((fav) => {
        res.send(humps.camelizeKeys(fav[0]))
      })
  }
})

module.exports = router;
