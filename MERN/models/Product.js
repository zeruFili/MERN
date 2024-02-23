const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required().trim().max(100),
    description: Joi.string().required().max(500),
    price: Joi.number().required().min(0),
  });

  return schema.validate(product);
}

module.exports = {
  Product
};