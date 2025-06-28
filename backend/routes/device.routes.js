const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Device routes
router.post('/', verifyToken, deviceController.addDevice);
router.get('/', verifyToken, deviceController.getAllDevices);
router.get('/:deviceId', verifyToken, deviceController.getDevice);
router.put('/:deviceId', verifyToken, deviceController.updateDevice);
router.delete('/:deviceId', verifyToken, deviceController.deleteDevice);

module.exports = router; 