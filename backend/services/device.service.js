const Device = require('../models/device.model');

class DeviceService {
    async addDevice(deviceData) {
        // Validate required fields
        const requiredFields = ['device_id', 'heart_rate_level', 'temperature_level', 'spo'];
        for (const field of requiredFields) {
            if (!deviceData[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Validate data types and ranges
        if (!Number.isInteger(deviceData.heart_rate_level) || deviceData.heart_rate_level < 0) {
            throw new Error('Invalid heart rate level');
        }
        if (!Number.isInteger(deviceData.temperature_level) || deviceData.temperature_level < 0) {
            throw new Error('Invalid temperature level');
        }
        if (!Number.isInteger(deviceData.spo) || deviceData.spo < 0 || deviceData.spo > 100) {
            throw new Error('Invalid SPO value. Must be between 0 and 100');
        }

        // Check if device already exists
        const existingDevice = await Device.findById(deviceData.device_id);
        if (existingDevice) {
            // If device exists, update it
            return await Device.update(deviceData.device_id, deviceData);
        }

        // Create new device
        return await Device.create(deviceData);
    }

    async getDevice(deviceId) {
        const device = await Device.findById(deviceId);
        if (!device) {
            throw new Error('Device not found');
        }
        return device;
    }

    async getAllDevices() {
        return await Device.getAll();
    }
}

module.exports = new DeviceService(); 