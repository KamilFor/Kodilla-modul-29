const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

mongoClient.connect(
  'mongodb://localhost:27017/',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully connected to the database');
      // MongoDB
      // import Data from MongoDB database
      const db = client.db('companyDB');
      const app = express();

      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      app.use((req, res, next) => {
        req.db = db;
        next();
      });

      app.use('/api', departmentsRoutes);
      app.use('/api', employeesRoutes);
      app.use('/api', productsRoutes);

      // Not found
      app.use((req, res) => {
        res.status(404).send({ message: 'Not found...' });
      });

      // Server;
      app.listen('8000', () => {
        console.log('Server is running on port: 8000');
      });

      // DB collection
      //   db.collection('employees').find({ department: 'IT' }, (err, data) => {
      //     if (!err) {
      //       data.each((error, employee) => {
      //         console.log(employee);
      //       });
      //     }

      //     // Adding Data to Departments
      //     // db.collection('departments').insertOne({ name: 'Management' }, (err) => {
      //     //   if (err) console.log('err');
      //     // });
      //   });

      // Express usage
    }
  }
);
