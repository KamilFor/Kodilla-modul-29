const Employee = require('../employees.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }
  });

  // READING
  // TEST 1
  describe('Reading data', () => {
    before(async () => {
      const employeeOne = new Employee({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      await employeeOne.save();

      const employeeTwo = new Employee({ firstName: 'Mateo', lastName: 'Pinowski', department: 'department' });
      await employeeTwo.save();
    });

    // TEST 1
    it('should return all the data with "find" method', async () => {
      const departments = await Employee.find();
      const expectedLength = 2;
      expect(departments.length).to.be.equal(expectedLength);
    });

    // TEST 2
    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      console.log(employee);

      expect(employee.firstName).to.be.equal('Kamil');
    });

    // AFTER
    after(async () => {
      await Employee.deleteMany();
    });
  });
  after(() => {
    mongoose.models = {};
  });
});
