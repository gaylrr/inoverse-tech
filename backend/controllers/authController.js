const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const { User }   = require('../models');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' });

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email } }
    });
  } catch (err) { next(err); }
};

exports.me = async (req, res) => {
  res.json({ success: true, data: req.user });
};