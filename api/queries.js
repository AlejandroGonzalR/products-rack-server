const Pool = require('pg').Pool;
const Database_Config = require('./config').database;

const pool = new Pool({
    user: Database_Config.user,
    host: Database_Config.host,
    database: Database_Config.database,
    password: Database_Config.password,
    port: Database_Config.port
});

const getProducts = (request, response) => {
    databaseConnection(request, response);
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(`Error in execution of statement, handle ${error.message}`);
            logError(request, response, error, 'Error getting products');
            return error;
        }
        response.status(200).json(results.rows)
    })
};

const getProductById = (request, response) => {
    const id = parseInt(request.params.id);
    databaseConnection(request, response);
    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(`Error in execution of statement in product ${id}, handle ${error.message}`);
            logError(request, response, error, `Error getting products ${id}`);
            return error;
        }
        response.status(200).json(results.rows)
    })
};

function databaseConnection(request, response) {
    console.log(`Handle request in ${request.method}: ${request.url}`);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
}

function logError(request, response, error, message) {
    response.status(500).json({
        status: 500,
        message: message,
        detailed_message: error.message
    });
}

module.exports = {
    getProducts,
    getProductById
};
