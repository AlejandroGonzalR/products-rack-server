'use strict';

const express = require('express');
const path = require('path');
const config = require('./config');

// Constants
const PORT = config.server.port;
const HOST = config.server.host;

// App
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Images Server')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
