const express = require('express');
// const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const EmployeesFunctions = require('../controllers/employees/employees.controller');

// After Changes
// GET Employees
router.get('/employees', EmployeesFunctions.getBasic);

//GET Employees Random
router.get('/employees/random', EmployeesFunctions.getRandom);

// GET EmployeesID
router.get('/employees/:id', EmployeesFunctions.getId);

// POST Employees
router.post('/employees', EmployeesFunctions.postBasic);

// PUT EmployessId
router.put('/employees/:id', EmployeesFunctions.putBasic);

// DELETE EmployeesId
router.delete('/employees/:id', EmployeesFunctions.deleteBasic);

module.exports = router;
