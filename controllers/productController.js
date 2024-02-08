const { Product, validateProduct } = require('../models/Product');

async function getAllProducts(req, res) {
  const products = await Product.find();
  res.json(products);
}

async function createProduct(req, res) {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.status(201).json(product);
}

async function updateProduct(req, res) {
  const { name, description, price } = req.body;
  await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price },
    { new: true }
  );
  res.sendStatus(204);
}

async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};