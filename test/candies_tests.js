/* globals describe it before */

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const app = require('../app')


describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })

  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.length).to.eql(4)
      done()
    })
  })
})

describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should return an object that has a field called "name" and "color"', (done) => {
    api.get('/candies/1')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        console.log(response.body)
        expect(response.body.result).to.have.property('name')
        expect(response.body.result).to.have.property('color')
        done()
      })
  })
})

describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 5,
        'name': 'lollipop',
        'color': 'red'
      }).end(done)
  })

  it('should add a candy object to the collection and return it', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body[response.body.length - 1].name).to.equal('lollipop')
        done()
      })
  })

  it('should add a new candy to the database', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        console.log(response.body)
        expect(response.body[response.body.length - 1].name).to.equal('lollipop')
        done()
      })
  })

  it('should return a 422 response if the field color is wrong', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 5,
        'name': 'bertie botts every flavor beans',
        'color': 'vomit'
      })
      .expect(422, done)
  })

  // it('should return an error message if the color field is wrong', (done) => {
  //   api.get('/candies')
  //     .set('Accept', 'application/json')
  //     .end((error, response) => {
  //       expect(response.body.message).to.eql('Color is wrong!!')
  //       done()
  //     })
  // })
})

describe('PUT /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.put('/candies/1')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should update a candy document', (done) => {
    api.put('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      console.log(response.body.message)
      expect(response.body.message).to.eql('1 updated')
      done()
    })
  })
})

describe('DELETE /candies/:id', () => {
  it('should remove a candy document', (done) => {
    api.delete('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(response.body.message).to.eql('1 deleted')
      done()
    })
  })
})
