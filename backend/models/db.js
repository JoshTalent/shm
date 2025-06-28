const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Create a connection pool
const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export promise-based pool for async/await usage
module.exports = pool.promise(); 