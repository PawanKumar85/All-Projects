// routes/employee.js
import express from 'express';
import { getConnection } from '../config/database.js';  // Import getConnection function

const router = express.Router();

// Create a new employee
router.post('/', async (req, res) => {
    const { ename, esalary } = req.body;
    try {
        const connection = await getConnection();  // Get a connection from the pool
        const result = await connection.execute(
            `INSERT INTO Employee (ename, esalary) VALUES (:ename, :esalary)`,
            [ename, esalary],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Employee created', eid: result.lastRowid });
        await connection.close(); // Close the connection after use
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const connection = await getConnection();  // Get a connection from the pool
        const result = await connection.execute(`SELECT * FROM Employee`);
        res.status(200).json(result.rows);
        await connection.close(); // Close the connection after use
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an employee
router.put('/:eid', async (req, res) => {
    const { eid } = req.params;
    const { ename, esalary } = req.body;
    try {
        const connection = await getConnection();  // Get a connection from the pool
        await connection.execute(
            `UPDATE Employee SET ename = :ename, esalary = :esalary WHERE eid = :eid`,
            { eid, ename, esalary },
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Employee updated' });
        await connection.close(); // Close the connection after use
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an employee
router.delete('/:eid', async (req, res) => {
    const { eid } = req.params;
    try {
        const connection = await getConnection();  // Get a connection from the pool
        await connection.execute(
            `DELETE FROM Employee WHERE eid = :eid`,
            { eid },
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Employee deleted' });
        await connection.close(); // Close the connection after use
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
