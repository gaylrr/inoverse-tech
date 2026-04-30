const express  = require('express');
require('dotenv').config();
const cors     = require('cors');
const path     = require('path');
const { sequelize, testConnection } = require('./config/db');
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact',  require('./routes/contact'));
app.use('/api/content',  require('./routes/content'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/technologies', require('./routes/technologies'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Inoverse Technologies API is running.' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message); // ← shows full error in terminal
  res.status(500).json({ success: false, message: err.message }); // shows in Postman too
});

// Start
const start = async () => {
  await testConnection();
  await sequelize.sync({ alter: true }); // ✅ syncs models with DB
  console.log('Database synced.');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
start();