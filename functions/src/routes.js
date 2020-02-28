const { get } = require('lodash')
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

// Create
router.post('/todo', async (req, res) => {
  const todoName = get(req.body, 'name', '')
  console.log(req.body.name, 33)
  if (!todoName) {
    res.status(400).send('please specify todo name')
    return
  }
  await db.ref('/todos').push({
    name: todoName
  })
  res.send(`Created todo: ${todoName}`)
})

// Read
router.get('/todos', async (req, res) => {
  const todos = await db.ref('/todos').once('value')
  res.json(todos)
})

// Update
router.put('/todo', async (req, res) => {
  const todoId = get(req.query, 'id', '')
  if (!todoId) {
    res.status(400).send('please specify todo id')
    return
  }
  const todoName = get(req.body, 'name', '')
  if (!todoName) {
    res.status(400).send('please specify todo name')
    return
  }
  await db.ref(`/todos/${todoId}`).update({
    name: todoName
  });
  res.send(`Update todo name - ${todoId}: ${todoName}`)
})

// Delete
router.delete('/todo', async (req, res) => {
  const todoId = get(req.query, 'id', '')
  if (!todoId) {
    res.status(400).send('please specify todo id')
    return
  }
  await db.ref(`/todos/${todoId}`).remove()
  res.send(`Deleted todo id: ${todoId}`)
})

module.exports = router
