// look up npm module boom!


'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex')
const humps = require('humps')

// YOUR CODE HERE

router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('title', 'asc')
    .then((books) => {
      res.send(humps.camelizeKeys(books))
    })
})

router.get('/books/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  if (id !== 'id') {
    return res.status(404)
              .set('Content-Type', 'text/plain')
              .send('Not Found')
  }
  if (Number.isNaN(id)) {
    return res.status(404)
              .set('Content-Type', 'text/plain')
              .send('Not Found')
  }
  knex('books')
    .where('id', id)
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})


router.post('/books', (req, res, next) => {
  if (req.body.title === undefined){
      return res.status(400)
                .set('Content-Type', 'text/plain')
                .send('Title must not be blank')
  }
  if (req.body.author === undefined) {
    return res.status(400)
              .set('Content-Type', 'text/plain')
              .send('Author must not be blank')
  }
  if (req.body.genre === undefined) {
    return res.status(400)
              .set('Content-Type', 'text/plain')
              .send('Genre must not be blank')
  }
  if (req.body.description === undefined) {
    return res.status(400)
              .set('Content-Type', 'text/plain')
              .send('Description must not be blank')
  }
  if (req.body.coverUrl === undefined) {
    return res.status(400)
              .set('Content-Type', 'text/plain')
              .send('Cover URL must not be blank')
  }
  knex('books')
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }).then((book) => {
      console.log(book[0]);
      res.send(humps.camelizeKeys(book[0]))
    })
})

router.patch('/books/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  if (id !== 'id') {
    return res.status(404)
              .set('Content-Type', 'text/plain')
              .send('Not Found')
  }
  if (Number.isNaN(id)) {
    return res.status(404)
              .set('Content-Type', 'text/plain')
              .send('Not Found')
  }
  let updated = req.body
  knex('books')
    .where('id', id)
    .then((book) => {
      book = humps.camelizeKeys(book[0])
      for (const key in book) {
        if (updated.hasOwnProperty(key)) {
          book[key] = updated[key]
        }
      }
      res.send(humps.camelizeKeys(book))
    })
})

router.delete('/books/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)
  if (id !== 'id') {
    return res.status(404)
              .set('Content-Type', 'text/plain')
              .send('Not Found')
  }
  if (Number.isNaN(id)) {
    return res.status(404)
              .set('Content-Type', 'text/plain')
              .send('Not Found')
  }
  knex('books')
    .returning(['title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', id)
    .del()
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    }).catch((err) => {
      next(err)
    })
})



module.exports = router;
