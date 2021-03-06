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

// app.get('/api/v1/items/:id', (request, response) => {
//   database('items').where('id', request.params.id)
//   .select()
//   .then((items) => {
//     response.status(200).json(items)
//   })
//   .catch((err) => {
//     response.status(500).json({err})
//   })
// })

app.post('/api/v1/items', (request, response) => {
  const name = request.body

  if (!request.body.name) {
    return response.status(422)
      .send({ error: `Expected: { name: <String> }. You're missing a item name.` });
  }

  database('items').insert(name, 'id')
  .then(item => {
    response.status(201).json({ id: name[0], name })
  })
  .catch(err => {
    response.status(500).json({ err })
  })
})

app.delete('/api/v1/items/:id', (request, response) => {
  database('items').where('id', request.params.id)
  .select()
  .del()
  .then(item => {
    if(!item.length) {
      response.status(200).send('Deleted!')
    } else {
      response.status(404).send('Item ID does\'t exist')
    }
  })
  .catch(err => {
    response.status(500).json({ err })
  })
})

app.patch('/api/v1/items', (request, response) => {
  const flipped = !request.body.packed
  database('items').where('id', request.body.id)
    .update({
      packed: flipped
    })
    .then(updated => {
      if(updated) {
        response.status(202).send(`Packed status updated to : ${request.body.packed}`)
      } else {
        response.status(404).send('Failed to update!')
      }
    })
    .catch(err => response.status(500).json({err}))
})

app.listen(app.get('port'), () => {
  console.log(`App running on ${app.get('port')}`)
})

module.exports = app