const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/report');
const scriptRoutes = require('./routes/script');
const sequelize = require('./infrastructure/dataBase');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });




app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', reportRoutes);
app.use('/api/v1', scriptRoutes);

// WebSocket Connection Handling
wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');

    // Send initial message on connection
    ws.send(JSON.stringify({ message: "WebSocket is connected!" }));

    // Send random values and port usage every 2 seconds
    const interval = setInterval(() => {
        const randomValue = Math.floor(Math.random() * 100);
        ws.send(JSON.stringify({ event: 'randomValue', value: randomValue }));

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

// Database sync
sequelize.sync({ force: false })
    .then(() => console.log('Database connected and models synced!'))
    .catch((error) => console.error('Error syncing database:', error));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
