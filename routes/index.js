const express = require('express');
const router = express.Router();
const { Order } = require('../models/index');
const { Product } = require('../models/index');

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products');
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new order
router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: 'Order created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: 'Product created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/orders/:id/products', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const productIds = req.body.productIds;
    order.products.push(...productIds);
    await order.save();
    res.json({ message: 'Products added to order' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
