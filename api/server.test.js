// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('users').truncate();
})
afterAll(async () => {
    await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})


describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})
const data = {
  id: 4,
  username: 'ghostmane',
  password: 'beans'
}
describe('[POST] api/auth/register', () => {
  it('should return 201', async () => {
    let res = await request(server)
      .post('/api/auth/register')
      .send(data);
    expect(res.status).toBe(201)
  })
  it('should return correct body', async () => {
    let res = await request(server)
      .post('/api/auth/register')
      .send(data);
    expect(res.body.username).toBe('ghostmane')
  })
})


describe('[POST] api/auth/login', () => {
  it('should return 201', async () => {
    await request(server)
      .post('/api/auth/register')
      .send(data);
    let res = await request(server)
      .post('/api/auth/login')
      .send(data);
    expect(res.status).toBe(200)
  })
  it('should return correct body', async () => {
    await request(server)
      .post('/api/auth/register')
      .send(data);
    let res = await request(server)
      .post('/api/auth/login')
      .send(data);
    expect(res.body.message).toBe('welcome, ghostmane')
  })
})

describe('[GET] api/jokes', () => {
  it('should return 3 jokes', async () => {
    await request(server)
      .post('/api/auth/register')
      .send(data);
    const loginResponse = await request(server)
      .post('/api/auth/login')
      .send(data);
    const token = loginResponse.body.token
    let res = await request(server)
      .get('/api/jokes')
      .set('authorization', token)
    console.log(res)
    expect(res.body.length).toBe(3)
  })
  it('should return 3 jokes', async () => {
    await request(server)
      .post('/api/auth/register')
      .send(data);
    const loginResponse = await request(server)
      .post('/api/auth/login')
      .send(data);
    const token = loginResponse.body.token
    let res = await request(server)
      .get('/api/jokes')
      .set('authorization', token)
    expect(res.status).toBe(200)
  })
})
