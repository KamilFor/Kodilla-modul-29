const Emplyoees = require('../department.model.js');
const expect = require('chai').expect;

describe('Emplyoees', () => {
  it('should throw an error if no "name" arg', () => {
    const employe = new Emplyoees({}); // create new Department, but don't set `name` attr value

    employe.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });
  // Test 2
  it('should throw an error if one of the props is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const employe = new Emplyoees({ firstName });

      employe.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
    for (let lastName of cases) {
      const employe = new Emplyoees({ lastName });

      employe.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
    for (let department of cases) {
      const employe = new Emplyoees({ department });

      employe.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  // Test 3
  it('should throw an error if "name" is too short or too long', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
    for (let firstName of cases) {
      const employe = new Emplyoees({ firstName });

      employe.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
});
