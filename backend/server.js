const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const departmentRoutes = require('./routes/departmentRoutes');
const clubRoutes = require('./routes/clubRoutes'); // Import club routes
const officerRoutes = require('./routes/officerRoutes'); // Import officer routes
const eventRoutes = require('./routes/eventRoutes'); // Import event routes
const path = require('path');

const app = express();
const port = 5000; // Ensure the port is set to 5000

// Increase the bodyParser limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Your routes
app.use('/api', departmentRoutes);
app.use('/api', clubRoutes); // Add club routes
app.use('/api', officerRoutes); // Add officer routes
app.use('/api', eventRoutes); // Add event routes

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

// Ensure the database connection is included
const db = require('./config/database');
db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('Database connected: ', results[0].solution);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
