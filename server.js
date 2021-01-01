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

      db.collection('employees').find({ department: 'IT' }, (err, data) => {
        if (!err) {
          data.each((error, employee) => {
            console.log(employee);
          });
        }
        //do something with data
        // Adding Data to Departments
        // db.collection('departments').insertOne({ name: 'Management' }, (err) => {
        //   if (err) console.log('err');
        // });
        console.log('do sth');
      });

      // Express usage
      const app = express();

      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      app.use('/api', employeesRoutes);
      app.use('/api', departmentsRoutes);
      app.use('/api', productsRoutes);

      app.use((req, res) => {
        res.status(404).send({ message: 'Not found...' });
      });

      app.listen('8000', () => {
        console.log('Server is running on port: 8000');
      });
    }
  }
);
