const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, cep, address, number } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (!cep || !address || !number) {
      return res.status(400).json({ error: 'CEP, address and house number are required' });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash: hash,
      cep,
      address,
      number
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      address: user.address,
      number: user.number
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      address: user.address,
      number: user.number
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: 'Se esse email existir, enviaremos as instruções.'
      });
    }

    const token = crypto.randomBytes(32).toString('hex');

    user.resetToken = token;
    user.resetExpires = Date.now() + 3600000;
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const resetUrl = `${frontendUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    await resend.emails.send({
      from: 'Associação dos Horticultores <onboarding@resend.dev>',
      to: email,
      subject: 'Redefinição de senha',
      html: `
        <h2>Redefinição de senha</h2>
        <p>Você solicitou a recuperação da sua senha.</p>
        <p>Clique no botão abaixo para criar uma nova senha:</p>
        <p>
          <a href="${resetUrl}" style="background:#2f4f2f;color:white;padding:12px 18px;text-decoration:none;border-radius:6px;">
            Redefinir senha
          </a>
        </p>
        <p>Esse link expira em 1 hora.</p>
      `
    });

    res.json({
      message: 'Se esse email existir, enviaremos as instruções.'
    });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    res.status(500).json({ error: err.message });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      return res.status(400).json({ error: 'email, token and password required' });
    }

    const user = await User.findOne({
      email,
      resetToken: token,
      resetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetExpires = undefined;

    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
