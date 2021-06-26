'use strict'

const express = require('express')
const app = express()
const path = require('path')

// loading body-parser
const bodyParser = require('body-parser')

app.use('/cdn', express.static(path.join(__dirname, 'public'))) /* this will mount
your public directory to '/cdn'. i.e. your scripts folder
will be at /cdn/scripts */
// only for html??? and browser viewing

// loading our routers
const classRouter = require('./classRoutes.js')

// tell Express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// defualt root redirects to class list
app.get('/', (req, res) => {
  res.redirect('class/')
})

// mounting router
app.use('/class', classRouter)
const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port 3000')
