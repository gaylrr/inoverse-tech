const { Message } = require('../models');
const nodemailer  = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

exports.submit = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });

    await Message.create({ name, email, message });

    try {
      await transporter.sendMail({
        from:    `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to:      process.env.SMTP_USER,
        replyTo: email,
        subject: `New inquiry from ${name} — Inoverse Technologies`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (mailErr) {
      console.error('Mail error (non-fatal):', mailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const messages = await Message.findAll({ order: [['created_at', 'DESC']] });
    res.json({ success: true, data: messages });
  } catch (err) { next(err); }
};

exports.markRead = async (req, res, next) => {
  try {
    await Message.update({ is_read: true }, { where: { id: req.params.id } });
    res.json({ success: true, message: 'Marked as read.' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Message.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) { next(err); }
};