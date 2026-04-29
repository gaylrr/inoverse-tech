require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User, sequelize } = require('./models');

async function createAdmin() {
  const name     = 'Inoverse Admin';
  const email    = 'admin@inoverse.com';
  const password = 'Admin@1234';

  await sequelize.sync();

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('Admin already exists!');
    process.exit(0);
  }

  await User.create({
    name,
    email,
    password_hash: await bcrypt.hash(password, 10),
    role: 'admin',
  });

  console.log('✅ Admin user created successfully.');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error('❌ Error creating admin:', err.message);
  process.exit(1);
});