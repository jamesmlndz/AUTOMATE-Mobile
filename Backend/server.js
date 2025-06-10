const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Service = require('./models/Service');
const AppointmentService = require('./models/AppointmentService');
const Progress = require('./models/Progress');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root Test Route
app.get('/', (req, res) => {
  res.send('✅ Server is working!');
});

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/auto-repair')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // .env email
    pass: process.env.EMAIL_PASS      // Gmail App Password
  }
});

// Generate 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

//
// 🔐 REGISTER
//
app.post('/register', async (req, res) => {
  const { fname, lname, contactNum, email, password } = req.body;

  console.log('📥 Registering user:', req.body);

  if (!fname || !lname || !contactNum || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { contactNum }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or contact number.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const newUser = new User({
      fname,
      lname,
      contactNum,
      email,
      password: hashedPassword,
      otp,
      isVerified: false
    });

    await newUser.save();
    console.log('✅ User saved:', email);

    // Send OTP email
    const mail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'AutoMate - Email Verification',
      html: `<h3>Hello ${fname},</h3><p>Your OTP is: <b>${otp}</b></p>`
    });

    console.log('📨 OTP email sent to:', mail.accepted);

    return res.status(201).json({
      message: 'OTP sent to your email.',
      email,
      userId: newUser._id
    });

  } catch (err) {
    console.error('❌ Register error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//
// ✅ VERIFY EMAIL
//
app.post('/verify-email', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP.' });

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully.' });
  } catch (err) {
    console.error('❌ Verification error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//
// 🔓 LOGIN
//
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email first.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });

    return res.status(200).json({
      message: 'Login successful.',
      userId: user._id,
      name: `${user.fname} ${user.lname}`
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//
// 📅 CREATE APPOINTMENT
//
app.post('/appointments', async (req, res) => {
  const { userId, service, date, time, carModel } = req.body;

  if (!userId || !service || !date || !time || !carModel) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const appointment = new Appointment({ userId, service, date, time, carModel, status: 'pending' });
    await appointment.save();
    return res.status(201).json(appointment);
  } catch (err) {
    console.error('❌ Appointment error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//
// 📄 GET USER APPOINTMENTS
//
app.get('/appointments/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.find({ userId }).sort({ date: 1, time: 1 });
    return res.status(200).json(appointments);
  } catch (err) {
    console.error('❌ Fetch appointments error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//
// 🔄 ADD PROGRESS UPDATE
//
app.post('/progress', async (req, res) => {
  const { appointmentId, statusUpdate, notes } = req.body;

  if (!appointmentId || !statusUpdate) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const progress = new Progress({ appointmentId, statusUpdate, notes });
    await progress.save();
    return res.status(201).json(progress);
  } catch (err) {
    console.error('❌ Save progress error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//
// 📊 GET PROGRESS BY APPOINTMENT
//
app.get('/progress/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const updates = await Progress.find({ appointmentId }).sort({ timestamp: 1 });
    return res.status(200).json(updates);
  } catch (err) {
    console.error('❌ Fetch progress error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//
// Start Server
//
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
