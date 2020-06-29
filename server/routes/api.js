const express = require('express')
const router = express.Router()
const Client = require('../modules/ClientSchema')



router.get('/clients', async function (req, res) {
  const allClients = await Client.find()
  res.send(allClients)
})

router.put('/clients/:id', async function (req, res) {
  const id = req.params.id
  const updates = req.body
  const client = await Client.findOneAndUpdate({ "_id": id }, updates, { new: true })
  res.send(client)
})

router.post('/actions', async function (req, res) {
  const data = req.body
  const client = new Client(data)
  await client.save()
  res.send(client)
})

router.put('/actions/:id', async function (req, res) {
  const id = req.params.id
  const updates = req.body
  const client = await Client.findOneAndUpdate({ "_id": id }, updates)
  res.send(client)
})




// router.post('/clients', async function (req, res) {
//   const data = await require('./data.json')
//   for (let e of data) {
//   const client = new Client(e)
//   await client.save()
//   }
//   res.send('hello')

// })

module.exports = router