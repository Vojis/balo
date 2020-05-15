const express = require('express')

const router = express.Router()
const { 
  createUser,
} = require('./userController')

router
  .route('/')
  .post(createUser)

module.exports = router
