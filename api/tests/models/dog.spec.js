const { Dog, Temperament,conn } = require('../../src/db.js');
const { expect } = require('chai');
const assert = require('assert');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });

  describe('Check', function() {
    let dog;
    dog = Dog.build({
      id: "eec0ad6d-a953-4f72-a369-cdf4740087cd",
      name: "Perro de prueba",
      height: "1 - 2",
      weight: "3 - 4",
      life_span: "5 - 7 years",
      temperaments: ""
    });
    it('Espera que sea igual', function (){
        expect(dog.name).to.equal("Perro de prueba");
    });
    it('Espera que sea igual', function (){
      expect(dog.temperaments).to.equal(undefined);
    });
  });

  describe('Validations', function () {
    beforeEach(() => Temperament.sync({ force: true }));
    it('01', function(done) {
       Dog.create({
        name: 'Hola',
       })
        .then(() => done(new Error("No deberia crearse")))
        .catch(() => done());
    });
    it('02', function(done) {
      Dog.create({
        height: 'hola',
      })
      .then(() => done(new Error("No deberia crearse")))
      .catch(() => done());
    });

 
  })

});
