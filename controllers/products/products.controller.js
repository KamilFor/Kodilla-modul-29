const Products = require('../../models/products.model');

// GET
exports.getBasic = async (req, res) => {
  try {
    res.json(await Products.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET RANDOM
exports.getRandom = async (req, res) => {
  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Products.findOne().skip(rand);
    if (!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET ID
exports.getId = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) res.status(4040).json({ message: 'Not found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// POST
exports.postBasic = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Products({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PUT
exports.putBasic = async (req, res) => {
  const { name, client } = req.body;

  try {
    await Products.updateOne({ _id: req.params.id }, { $set: { name: name, client: client } });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// DELETE
exports.deleteBasic = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product) {
      await Products.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
