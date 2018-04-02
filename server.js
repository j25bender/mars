const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/api/v1/items', (request, response) => {
  database('items').select()
  .then((items) => {
    response.status(200).json(items)
  })
  .catch((err) => {
    response.status(500).json({err})
  })
})

app.post('/api/v1/items', (request, response) => {
  const { itemToAdd } = request.body

  database('items').insert({ itemToAdd }, 'id')
  .then(item => {
    response.status(201).json({ id: item[0], itemToAdd })
  })
  .catch(err => {
    response.status(500).json({ err })
  })
})

app.listen(app.get('port'), () => {
  console.log(`App running on ${app.get('port')}`)
})