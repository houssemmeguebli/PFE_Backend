const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/report');
const scriptRoutes = require('./routes/script');
const pythonScript = require("./routes/pythonScript")
const sequelize = require('./infrastructure/dataBase');
const path = require('path');
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Enable CORS with dynamic origin for development
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:54089', 'http://localhost:53731']; // Add more origins if needed
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static('uploads'));

// Routes with unique sub-paths
app.use('/api/v1', userRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1', scriptRoutes);
app.use('/api/v1/run-python-script',pythonScript);

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        return res.status(400).json({ error: `Multer error: ${err.message}` });
    }
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// Database Sync and Server Start
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Database connected and models synced!');
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
        process.exit(1);
    });

/*
// WebSocket Connection Handling - Uncomment if you need WebSocket functionality
wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');
    ws.send(JSON.stringify({ message: "WebSocket is connected!" }));
    const interval = setInterval(() => {
        const data = {
            tension: Math.floor(Math.random() * 11) + 10,
            current: Math.floor(Math.random() * 6) + 1,
            speed: Math.floor(Math.random() * 50) + 10,
            couple: Math.floor(Math.random() * 20) + 5,
            pousse: Math.floor(Math.random() * 30) + 5,
            temperature: Math.floor(Math.random() * 50) + 10,
            vibration: Math.floor(Math.random() * 10) + 1,
            saon: Math.floor(Math.random() * 100) + 10,
        };
        ws.send(JSON.stringify(data));
    }, 1000);
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(JSON.stringify({ event: 'echo', received: message }));
    });
    ws.on('close', () => {
        console.log('WebSocket client disconnected');
        clearInterval(interval);
    });
});
*/

module.exports = app;