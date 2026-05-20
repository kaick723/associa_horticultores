const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const makeTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // development fallback: create an Ethereal test account
  try{
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
    transporter.__isEthereal = true;
    return transporter;
  }catch(e){
    return null;
  }
};

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, cep, address, number } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    if (!cep || !address || !number) return res.status(400).json({ error: 'CEP, address and house number are required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash: hash, cep, address, number });
    await user.save();
    res.status(201).json({ id: user._id, name: user.name, email: user.email, cep: user.cep, address: user.address, number: user.number });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login (simple)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ id: user._id, name: user.name, email: user.email, cep: user.cep, address: user.address, number: user.number });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Forgot password - send email with token link
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If that email exists we sent instructions' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5175'}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const transporter = await makeTransporter();
    let previewUrl = null;
    if (transporter) {
      const info = await transporter.sendMail({
        to: email,
        from: process.env.SMTP_FROM || 'no-reply@horticultores.local',
        subject: 'Redefinição de senha',
        text: `Clique no link para redefinir sua senha: ${resetUrl}`,
        html: `<p>Clique no link para redefinir sua senha:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
      });
      if(transporter.__isEthereal){
        previewUrl = nodemailer.getTestMessageUrl(info);
        console.log('Preview URL (Ethereal):', previewUrl);
      }
    } else {
      console.log('Password reset link (no SMTP configured):', resetUrl);
    }

    const response = { message: 'If that email exists we sent instructions' };
    if(previewUrl) response.previewUrl = previewUrl;
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, password } = req.body;
    if (!email || !token || !password) return res.status(400).json({ error: 'email, token and password required' });
    const user = await User.findOne({ email, resetToken: token, resetExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
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
