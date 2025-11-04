const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // adjust if your app.js exports Express app
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// CRUD test
describe('Pokemon CRUD', () => {
  let pokemonId;

  test('POST /api/pokemons should create a new pokemon', async () => {
    const res = await request(app)
      .post('/api/pokemons')
      .send({
        name: 'Testchu',
        type: 'Electric',
        hp: 50,
        attack: 60,
        defense: 40,
        speed: 90
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Testchu');
    pokemonId = res.body._id;
  });

  test('GET /api/pokemons should return a list including Testchu', async () => {
    const res = await request(app).get('/api/pokemons');
    expect(res.statusCode).toBe(200);
    const names = res.body.map(p => p.name);
    expect(names).toContain('Testchu');
  });
});

// Question endpoints
describe('Pokemon question endpoints', () => {
  test('GET /api/questions/fastest returns a valid answer', async () => {
    const res = await request(app).get('/api/questions/fastest');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('question');
    expect(res.body).toHaveProperty('answer');
  });

  test('GET /api/questions/count returns a total number', async () => {
    const res = await request(app).get('/api/questions/count');
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.answer).toBe('number');
  });
});
