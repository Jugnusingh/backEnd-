const adminSchema = require('../schema/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECREAT_KEY = 'NotesApi';

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingAdmin = await adminSchema.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({
        message: 'Admin already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await adminSchema.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign({ email: newAdmin.email, id: newAdmin._id }, SECREAT_KEY);

    res.status(201).json({ user: newAdmin, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await adminSchema.findOne({ email: email });
    if (!existingAdmin) {
      return res.status(404).json({
        message: 'Admin not found',
      });
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id }, SECREAT_KEY);

    res.status(200).json({ user: existingAdmin, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = { signup, signin };
