const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

async function validateProduct(req, res, next) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProduct(req, res, next) {
  try {
    const { name, description, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
}

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createProduct(req, res, next) {
    try {
      const { name, description, price } = req.body;
      const product = new Product({ name, description, price });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.log(error); // Log the error to the console
      res.status(400).json({ error: error.message });
    }
  }

async function deleteProduct(req, res, next) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  validateProduct,
  updateProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
};