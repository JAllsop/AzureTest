'use strict'

const path = require('path')
const express = require('express')
const classList = require('./classList')
const router = express.Router()

// RESTful api
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'scripts', 'class', 'index.html'))
})

router.get('/api/list', function (req, res) {
  res.json(classList.get()) // Respond with JSON
})

router.get('/api/get/:id', function (req, res) {
  res.json(classList.get()[req.params.id]) // Notice the wildcard in the URL?
  // Try browsing to /api/get/0 once you've added some entries
})

router.post('/api/create', function (req, res) {
  console.log('Creating the following student:', req.body)
  classList.add(req.body)
  res.redirect(req.baseUrl + '/api/list')
})

// router.post('/api/delete', function (req, res) {
//   console.log('Deleting a student entry', req.body.student)
//   classList = classList.filter(element => element !== req.body.student)
//   res.redirect(req.baseUrl + '/api/list')
// })

// router.post('/api/edit', function (req, res) {
//   console.log(`Editing a student entry from ${req.body.student} to ${req.body.newStudent}`)
//   classList[classList.indexOf(req.body.student)] = req.body.newStudent
//   res.redirect(req.baseUrl + '/api/list')
// })

module.exports = router
