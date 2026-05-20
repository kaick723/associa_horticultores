// routes/admin.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Order = require("../models/Order");

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Usuário não encontrado" });

    const valid = admin.isValidPassword(password);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });

    res.json({ message: "Login OK" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CRIAR ADMIN
router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: "Admin já existe" });

    const admin = new Admin({ username, password });
    await admin.save();

    res.json({ message: "Admin criado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETAR ADMIN
router.delete("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const admin = await Admin.findOneAndDelete({ username });
    if (!admin) return res.status(404).json({ message: "Admin não encontrado" });
    res.json({ message: `Admin '${username}' deletado com sucesso` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status
router.put("/orders/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
