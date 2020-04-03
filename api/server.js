'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./queries');

// Constants
const PORT = config.server.port;
const HOST = config.server.host;

// App
const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.send('Product Server')
});

app.get('/products', db.getProducts);

app.get('/products/:id', db.getProductById);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
