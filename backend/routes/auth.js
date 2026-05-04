const express = require('express');
const router = express.Router();
const { login, me } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/login', login)
router.get('/me', authenticate, me);
router.put('/change-password', authenticate, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const { User } = require('../models')
    const bcrypt = require('bcryptjs')

    const user = await User.findByPk(req.user.id)
    const match = await bcrypt.compare(currentPassword, user.password_hash)
    if (!match) return res.status(400).json({ success: false, message: 'Current password is incorrect.' })

    user.password_hash = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ success: true, message: 'Password changed successfully.' })
  } catch (err) { next(err) }
})

module.exports = router;