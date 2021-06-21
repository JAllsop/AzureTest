const express = require('express')
const app = express()
const mainRouter = require('./mainRoutes')

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)

app.use(mainRouter)