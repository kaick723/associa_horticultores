const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');

// Create user
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) return res.status(400).json({ error: 'Name and address required' });
    const user = new User({ name, address });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create order (específica, deve vir antes de /:id)
router.post('/orders', async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const order = new Order({
      user: userId,
      items,
      total,
      deliveryAddress: {
        cep: user.cep,
        address: user.address,
        number: user.number
      }
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get orders for a user
router.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Optional: get user by id (genérica, deve vir por último)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
