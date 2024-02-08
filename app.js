const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/product')
  .then(() => {

    console.log('Connected to MongoDB');

  })

  .catch((error) => {

    console.error('Error connecting to MongoDB', error);   
    
  });


app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});