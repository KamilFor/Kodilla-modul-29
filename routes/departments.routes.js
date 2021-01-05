const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');
// const ObjectId = require('mongodb').ObjectId;
//Nie potrzebny już, ale bez mongoose obowiązkowy

//import Functions
const DepartmentFunctions = require('../controllers/departments/departments.controller');

// Departments
router.get('/departments', DepartmentFunctions.getAll);

// Departments Random
router.get('/departments/random', DepartmentFunctions.getRandom);

// Departments ID
router.get('/departments/:id', DepartmentFunctions.getId);

// POST Department
router.post('/departments', DepartmentFunctions.postBasic);

// Put DepartmentsID
router.put('/departments/:id', DepartmentFunctions.putId);

//Delete DepartmentsID
router.delete('/departments/:id', DepartmentFunctions.deleteId);
// bez mongoose

module.exports = router;
