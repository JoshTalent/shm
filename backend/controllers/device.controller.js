const db = require('../models/db');

// Add a new device
const addDevice = async (req, res) => {
    try {
        const { name, type, status } = req.body;
        
        if (!name || !type) {
            return res.status(400).json({
                success: false,
                message: 'Name and type are required fields'
            });
        }

        const query = 'INSERT INTO devices (name, type, status, user_id) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, type, status || 'active', req.user.userId]);

        res.status(201).json({
            success: true,
            message: 'Device added successfully',
            deviceId: result.insertId
        });
    } catch (error) {
        console.error('Error adding device:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get all devices for the authenticated user
const getAllDevices = async (req, res) => {
    try {
        const query = 'SELECT * FROM devices WHERE user_id = ?';
        const [devices] = await db.execute(query, [req.user.userId]);

        res.json({
            success: true,
            devices
        });
    } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get a specific device by ID
const getDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const query = 'SELECT * FROM devices WHERE id = ? AND user_id = ?';
        const [devices] = await db.execute(query, [deviceId, req.user.userId]);

        if (devices.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Device not found'
            });
        }

        res.json({
            success: true,
            device: devices[0]
        });
    } catch (error) {
        console.error('Error fetching device:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Update a device by ID
const updateDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { name, type, status } = req.body;
        // Only update fields that are provided
        const fields = [];
        const values = [];
        if (name) {
            fields.push('name = ?');
            values.push(name);
        }
        if (type) {
            fields.push('type = ?');
            values.push(type);
        }
        if (status) {
            fields.push('status = ?');
            values.push(status);
        }
        if (fields.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }
        values.push(deviceId, req.user.userId);
        const query = `UPDATE devices SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`;
        const [result] = await db.execute(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Device not found or not authorized' });
        }
        res.json({ success: true, message: 'Device updated successfully' });
    } catch (error) {
        console.error('Error updating device:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete a device by ID
const deleteDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const query = 'DELETE FROM devices WHERE id = ? AND user_id = ?';
        const [result] = await db.execute(query, [deviceId, req.user.userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Device not found or not authorized' });
        }
        res.json({ success: true, message: 'Device deleted successfully' });
    } catch (error) {
        console.error('Error deleting device:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    addDevice,
    getAllDevices,
    getDevice,
    updateDevice,
    deleteDevice
}; 