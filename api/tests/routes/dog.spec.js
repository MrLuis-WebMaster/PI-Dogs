/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: "d97631e2-61f4-4f86-9589-9caf5c2cccb5",
  name: "Pug",
  height: "1 - 2",
  weight: "3 - 88",
  life_span: "5 - 7 years",
  image: "https://image.freepik.com/free-vector/cute-dog-sticking-her-tongue-out-cartoon-icon-illustration_138676-2709.jpg",
  temperaments: "Adventurous,Aggressive,Amiable,Assertive",
};

describe('dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs')
      .expect(200)
      .expect("Content-Type", /json/)
    );
  });
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament')
      .expect(200)
      .expect("Content-Type", /json/)
    );
  });

});
