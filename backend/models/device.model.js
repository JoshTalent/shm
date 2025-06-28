const db = require('./index');

const Device = {
    create: (deviceData) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO shm_devices SET ?', deviceData, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    findById: (deviceId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM shm_devices WHERE device_id = ?', [deviceId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM shm_devices', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    update: (deviceId, deviceData) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE shm_devices SET ? WHERE device_id = ?',
                [deviceData, deviceId],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });
    }
};

module.exports = Device; 