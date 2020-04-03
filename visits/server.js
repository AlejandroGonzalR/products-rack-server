'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const redis = require("redis"), db = redis.createClient({  host: 'redis-server', port: 6379 });
const config = require('./config');

// Constants
const PORT = config.server.port;
const HOST = config.server.host;

// App
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.get('/clean', (req, res) => {
    db.flushdb( (err, succeeded) => {
        if (err) {
            console.log(`Error in Redis statement, handle ${error.message}`);
            logError(req, res, err, 'Error in flushing database');
            return err;
        }
        console.log(succeeded);
    });
   res.send('clean')
});

app.post('/visit', (req, res) => {


    db.incr(req.body.id, (err, reply) => {
        if (err) {
            console.log(`Error in Redis statement, handle ${err.message}`);
            logError(req, res, err, 'Error on reply registration');
            return err;
        }
        db.get(req.body.id, (err, result) => {
            if (err) {
                console.log(`Error in Redis statement, handle ${err.message}`);
                logError(req, res, err, 'Error in flushing database');
                return err;
            }
            console.log(`Reply: ${reply}, Result: ${result}`);
            res.json({id: req.body.id, visit: reply});
        });
    });
});

function logError(req, res, err, message) {
    res.status(500).json({
        status: 500,
        message: message,
        detailed_message: err.message
    });
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
