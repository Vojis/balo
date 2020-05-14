const express = require('express')
const dotenv = require('dotenv')
require('colors')
const connectDB = require('./config/db')

// Load env variables
dotenv.config({ path: './config/config.env'})

// connect to DB
connectDB()

const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.cyan.inverse))
