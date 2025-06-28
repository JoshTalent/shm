const db = require('./index');

const User = {
    findByUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE user_username = ?', [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    findById: (userId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    create: (userData) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', userData, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    update: (userId, userData) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET ? WHERE user_id = ?', [userData, userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return User.findById(userId);
            });
        });
    }
};

module.exports = User; 