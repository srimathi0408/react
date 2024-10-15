const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const craftRoutes = require('./routes/craftRoutes');
const decorRoutes = require('./routes/decorRoutes');
const statueRoutes = require('./routes/statueRoutes');
const productRoutes = require('./routes/productRoutes');
const loginRoutes = require('./routes/loginRoutes');    // Added login routes
const signupRoutes = require('./routes/signupRoutes');  // Added signup routes

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  // Applying CORS options globally
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/craftDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

// API routes
app.use('/api', craftRoutes);
app.use('/api', decorRoutes);
app.use('/api', statueRoutes);
app.use('/api/products', productRoutes);

// Auth routes
app.use('/api', signupRoutes);  // Signup route
app.use('/api', loginRoutes);   // Login route

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
