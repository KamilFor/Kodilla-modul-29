const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

// After changes
// Departments
router.get('/departments', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

// Departments Random
router.get('/departments/random', (req, res) => {
  req.db.collection('departments').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

// Departments ID
router.get('/departments/:id', (req, res) => {
  req.db.collection('departments').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if (err) res.status(500).json({ message: err });
    else if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});

// POST Department
router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').insertOne({ name: name }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

// Put DepartmentsID
router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name } }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

//Delete DepartmentsID
router.delete('/departments/:id', (req, res) => {
  req.db.collection('departments').deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

module.exports = router;
