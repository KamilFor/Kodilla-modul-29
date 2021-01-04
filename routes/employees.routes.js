const express = require('express');
// const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Employee = require('../models/employees.model');

// After Changes
// GET Employees
router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Without mongoose
/*
router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});*/

//GET Employees Random
router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
// Wihtout Mongoose
/*
router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});*/

// router.get('/employees/random', (req, res) => {
//   res.json(db.employees[Math.floor(Math.random() * db.length)]);
// });

// GET EmployeesID
router.get('/employees/:id', async (req, res) => {
  try {
    const employ = await Employee.findById(req.params.id);
    if (!employ) res.status(404).json({ message: 'Not foune' });
    else res.json(employ);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
// Without Mongoose
/*
router.get('/departments/:id', (req, res) => {
  req.db.collection('employess').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if (err) res.status(500).json({ message: err });
    else if (!data) res.status(404).json({ message: 'Not found 404' });
    else res.json(data);
  });
}); */

// POST Employees
router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
// Without Mongoose
/*
router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').insertOne({ firstName: firstName, lastName: lastName }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
}); */

// PUT EmployessId
router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    await Employee.updateOne(
      { _id: req.params.id },
      { $set: { firstName: firstName, lastName: lastName, department: department } }
    );
  } catch (err) {
    res.status(500).json({ message });
  }
});
// Without Mongoose
/*
router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db
    .collection('employees')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { firstName: firstName, lastName: lastName } }, (err) => {
      if (err) res.status(500).json({ message: err });
      else res.json({ message: 'OK' });
    });
}); */

// router.put('/employees/:id', (req, res) => {
//   const { firstName, lastName } = req.body;
//   db = db.employees.map((item) => (item.id == req.params.id ? { ...item, firstName, lastName } : item));
//   res.json({ message: 'OK' });
// });

// DELETE EmployeesId
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Emplyee.findById(req.params.id);
    if (employee) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Without Mongoose
/*
router.delete('/employees/:id', (req, res) => {
  req.db.collection('departments').deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
}); */

// router.delete('/employees/:id', (req, res) => {
//   db = db.employees.filter((item) => item.id != req.params.id);
//   res.json({ message: 'OK' });
// });

module.exports = router;
