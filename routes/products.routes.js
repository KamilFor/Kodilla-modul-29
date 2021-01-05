// post.routes.js

const express = require('express');
const router = express.Router();
const Products = require('../models/products.model');
const ProductsFunctions = require('../controllers/products/products.controller');
// const db = require('./../db');
// const ObjectId = require('mongodb').ObjectId;

// Mongoose

// GET Products
router.get('/products', ProductsFunctions.getBasic);

// GET Random
router.get('/products/random', ProductsFunctions.getRandom);

// GET ID
router.get('/products/:id', ProductsFunctions.getId);

// POST
router.post('/products', ProductsFunctions.getId);

// Put ID
router.put('/products/:id', ProductsFunctions.putBasic);

// Delete ProductsID
router.delete('/products/:id', ProductsFunctions.deleteBasic);

module.exports = router;
////////////////////////////////////////////////////////////////////////////////////
/*
// After changes
//GET Products
router.get('/products', (req, res) => {
  req.db.collection('products').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

// router.get('/products', (req, res) => {
//   res.json(db.products);
// });

// GET Products/ Random
router.get('/products/random', (req, res) => {
  req.db.collection('products').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

// router.get('/products/random', (req, res) => {
//   res.json(db.products[Math.floor(Math.random() * db.length)]);
// });

// GET ProductsId
router.get('/products/:id', (req, res) => {
  req.db.collection('prodcuts').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if (err) res.status(500).json({ message: err });
    else if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});

// router.get('/products/:id', (req, res) => {
//   res.json(db.products.find((item) => item.id == req.params.id));
// });

// POST Products
router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').insertOne({ name: name, client: client }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

// router.post('/products', (req, res) => {
//   const { name, client } = req.body;
//   db.products.push({ id: 3, name, client });
//   res.json({ message: 'OK' });
// });

// PUT ProductsId
router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  req.db
    .collection('products')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name, client: client } }, (err) => {
      if (err) res.status(500).json({ message: err });
      else res.json({ message: 'OK' });
    });
});

// router.put('/products/:id', (req, res) => {
//   const { name, client } = req.body;
//   db = db.products.map((item) => (item.id == req.params.id ? { ...item, name, client } : item));
//   res.json({ message: 'OK' });
// });

// DELETE ProductsId
router.delete('/products/:id', (req, res) => {
  req.db.collection('products').deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

// router.delete('/products/:id', (req, res) => {
//   db = db.products.filter((item) => item.id != req.params.id);
//   res.json({ message: 'OK' });
// });
*/
