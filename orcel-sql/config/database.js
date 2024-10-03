// config/database.js
import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
};

let pool;

const connectDB = async () => {
    try {
        oracledb.initOracleClient({ libDir: 'C:\\instantclient_23_5' }); // Replace with your path
        // Create a connection pool
        pool = await oracledb.createPool({
            ...dbConfig,
            poolMin: 5,   // Minimum number of connections
            poolMax: 10,  // Maximum number of connections
            poolIncrement: 1, // Number of connections to create when pool is exhausted
        });
        console.log('OracleDB connection pool created successfully');
    } catch (error) {
        console.log('OracleDB connection failed');
        console.error('Error message:', error.message);
        process.exit(1);
    }
};

// Function to get a connection from the pool
const getConnection = async () => {
    if (!pool) {
        throw new Error('Connection pool not initialized');
    }
    return await pool.getConnection();
};

export { connectDB, getConnection };
