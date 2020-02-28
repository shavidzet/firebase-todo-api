// const { get } = require('lodash')
const express = require('express')
const router = express.Router()
const cors = require('cors')
const { admin } = require('./firebase')
const db = admin.database()

router.all('*', cors())

router.get('/addMessage', async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text
  // eslint-disable-next-line
  console.log(original, 44)
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  /* eslint-disable */
  const snapshot = await db.ref('/messages').push({ original })
  res.send(original)
})

module.exports = router
