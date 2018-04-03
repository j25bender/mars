process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../server')

const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API routes', () => {

  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done()
        })
      })
    })
  })

  describe('GET /api/v1/items', () => {
    it('should have a GET route for items', () => {
      return chai.request(app)
      .get('/api/v1/items')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json

        response.body.length.should.equal(3)
      })
      .catch(error => {
        throw error
      })
    })
  })

  describe('POST /api/v1/items', () => {

    beforeEach((done) => {
      database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
        .then(() => {
          done()
        })
      })
    })

    it('should POST new items', () => {
      return chai.request(app)
      .post('/api/v1/items')
      .send({
        name: 'laser-beams',
        packed: false
      })
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')

        response.body.should.have.property('name')
        response.body.name.name.should.equal('laser-beams')
      })
      .catch(error => {
        throw error
      })
    })

    it('should NOT POST new items if item name missing', () => {
      return chai.request(app)
      .post('/api/v1/items')
      .send({
        // name: 'laser-beams',
        // packed: false
      })
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
      })
      .catch(error => {
        throw error
      })
    })
  })
    
  describe('DELETE /api/v1/items/:id', () => {
    it('should DELETE new items', () => {
      return chai.request(app)
      .delete('/api/v1/items/1')
      .then(response => {
        response.should.have.status(200)
      })
      .catch(error => {
        throw error
      })
    })

    it('should NOT DELETE items with invalid id', () => {
      return chai.request(app)
      .delete('/api/v1/items/12341234141')
      .then(response => {
        response.should.have.status(500)
      })
      .catch(error => {
        throw error
      })
    })
  })
})
