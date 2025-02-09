// backend/server.js
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


// Event and User routes
const eventRoutes = require('./routes/events'); // Ensure this line is present
const userRoutes = require('./routes/users'); // Ensure this line is present
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes); // Ensure this line is present

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});