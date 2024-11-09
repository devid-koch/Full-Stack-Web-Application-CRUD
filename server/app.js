const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');


app.use(express.json());
app.use(bodyParser.json()); 
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', authRoutes);
app.use('/api', userRoutes);

module.exports = app;
