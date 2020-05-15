const express = require('express')
const dotenv = require('dotenv')
require('colors')
const connectDB = require('./config/db')

// Load env variables
dotenv.config({ path: './config/config.env'})

// connect to DB
connectDB()

const userRoutes = require('./users/userRoutes')

const app = express()
app.use(express.json())

// Mount routers
app.use('/api/v1/users', userRoutes)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.cyan.inverse))

// Hanlde unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
