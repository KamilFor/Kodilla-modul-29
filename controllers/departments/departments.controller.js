const Department = require('../../models/department.model');

// GET
exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// GET RANDOM
exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// GET ID
exports.getId = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// POST
exports.postBasic = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// PUT ID
exports.putId = async (req, res) => {
  const { name } = req.body;

  try {
    await Department.updateOne({ _id: req.params.id }, { $set: { name: name } });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// DELETE
exports.deleteId = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// Without mongoose
// GET
/*
router.get('/departments', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});
*/

// GET RANDOM
/*
router.get('/departments/random', (req, res) => {
  req.db.collection('departments').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});
*/

// GET ID
/*
router.get('/departments/:id', (req, res) => {
  req.db.collection('departments').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if (err) res.status(500).json({ message: err });
    else if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});
*/

// POST BASIC
/*
router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').insertOne({ name: name }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
// PUT ID
/*
router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name } }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
// DELETE ID
/*
router.delete('/departments/:id', (req, res) => {
  req.db.collection('departments').deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
