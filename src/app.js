const express = require('express')
const cors = require('cors')

const router = require('./routes/index')
const AppError = require('./utils/appError')
const errorHandler = require('./utils/errorHandler')

const PORT = 3000
const app = express()

app.use(express.json())

app.use(router)

app.use(errorHandler)

app.all('*', (request, response, next) => {

    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404))
})

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

module.exports = app