const Employee = require('../employees.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getUri();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }
  });

  // AFTER
  after(() => {
    mongoose.models = {};
  });

  // READING
  // TEST 1
  describe('Reading data', () => {
    // BAZA DANYCH
    beforeEach(async () => {
      const employeeOne = new Employee({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      const employeeTwo = new Employee({ firstName: 'Mateo', lastName: 'Pinowski', department: 'department' });
      await employeeOne.save();

      await employeeTwo.save();
    });

    // AFTER
    afterEach(async () => {
      await Employee.deleteMany();
    });

    // TEST 1
    it('should return all the data with "find" method', async () => {
      const employee = await Employee.find();
      const expectedLength = 2;
      expect(employee.length).to.be.equal(expectedLength);
    });

    // TEST 2
    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });

      expect(employee.firstName).to.be.equal('Kamil');
    });
  });
  // CREATE
  describe('Create Data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      await employee.save();
      const savedEmployee = await Employee.findOne({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      expect(savedEmployee).to.not.be.null;
    });
  });

  // UPLOAD
  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmplOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmplOne.save();

      const testEmplTwo = new Employee({ firstName: 'Mark', lastName: 'Twin', department: 'IT' });
      await testEmplTwo.save();
    });
    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: 'John', lastName: 'Doe', department: 'IT' },
        { $set: { firstName: '=Kamil=' } }
      );
      const updatedEmployee = await Employee.findOne({ firstName: '=Kamil=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = '=Roberto=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: '=Roberto=',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employee = await Employee.find();
      expect(employee[0].firstName).to.be.equal('Updated!');
      expect(employee[1].firstName).to.be.equal('Updated!');
    });

    // AFTER
    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  // DELETE
  describe('Removing data', () => {
    // BEFORE
    beforeEach(async () => {
      const employeeNumberOne = new Employee({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      await employeeNumberOne.save();

      const employeeNumberTwo = new Employee({ firstName: 'Meteo', lastName: 'Doe', department: 'HR' });
      await employeeNumberTwo.save();
    });
    // AFTER
    afterEach(async () => {
      await Employee.deleteMany();
    });

    //TEST 1
    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Kamil', lastName: 'Fornalski', department: 'IT' });
      const removeEmployee = await Employee.findOne({ firstName: 'Kamil' });
      expect(removeEmployee).to.be.null;
    });

    //TEST 2
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Kamil' });
      await employee.remove();
      const removeEmployee = await Employee.findOne({ firstName: 'Kamil' });
      expect(removeEmployee).to.be.null;
    });

    // TEST 3

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
    });
  });
});
