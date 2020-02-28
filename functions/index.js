require('dotenv').config()
const functions = require('firebase-functions')
const express = require('express')
const app = express()

const router = require('./src/routes')
app.use('/', router)

module.exports = {
  api: functions.https.onRequest(app)
}
