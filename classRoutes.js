'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()

let classList = [] // our class list array

// RESTful api
router.get('/api/list', function (req, res) {
  res.json(classList) // Respond with JSON
})

router.get('/api/get/:id', function (req, res) {
  res.json(classList[req.params.id]) // Notice the wildcard in the URL?
  // Try browsing to /api/get/0 once you've added some entries
})

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'index.html'))
})

router.get('/create', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'create.html'))
})

router.post('/api/create', function (req, res) {
  console.log('Creating the following student:', req.body.student)
  classList.push({ name: req.body.student, number: req.body.studentNumber })
  res.redirect(req.baseUrl + '/api/list')
})

router.get('/delete', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'delete.html'))
})

router.post('/api/delete', function (req, res) {
  console.log('Deleting a student entry', req.body.student)
  classList = classList.filter(element => element !== req.body.student)
  res.redirect(req.baseUrl + '/api/list')
})

router.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'edit.html'))
})

router.post('/api/edit', function (req, res) {
  console.log(`Editing a student entry from ${req.body.student} to ${req.body.newStudent}`)
  classList[classList.indexOf(req.body.student)] = req.body.newStudent
  res.redirect(req.baseUrl + '/api/list')
})

module.exports = router
