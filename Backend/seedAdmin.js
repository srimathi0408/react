// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust this to your actual User model path
require('dotenv').config(); // For environment variables

const seedAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminEmail = "admin@example.com"; // Admin email
    const adminPassword = "adminpassword";  // Admin password
    const adminRole = "admin";

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin user
    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
      role: adminRole,
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    mongoose.connection.close();
  }
};

seedAdminUser();
