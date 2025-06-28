// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mysql = require('mysql2')
// const dotenv = require('dotenv')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

// dotenv.config()

// // JWT Secret (for development only - in production use environment variables)
// const JWT_SECRET = 'your_super_secret_key_for_r_health_care'

// app.use(cors())
// app.use(express.json())


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// })



// db.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Connected to MySQL')
//     }
// })


// // user registration    
// app.post('/register', (req, res) => {
//     const { user_username, user_usertype, user_password } = req.body

//     // Check if username already exists
//     const checkQuery = 'SELECT * FROM user WHERE user_username = ?'
//     db.query(checkQuery, [user_username], (err, result) => {
//         if (err) {
//             console.error(err)
//             return res.status(500).json({ message: 'Database error occurred' })
//         }

//         if (result.length > 0) {
//             return res.status(400).json({ message: 'Username already exists' })
//         }

//         const hashedPassword = bcrypt.hashSync(user_password, 10)

//         const query = 'INSERT INTO user (user_username, user_usertype, user_password) VALUES (?, ?, ?)'
//         db.query(query, [user_username, user_usertype, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error(err)
//                 return res.status(500).json({ message: 'Error creating user' })
//             }
//             res.status(201).json({ message: 'User registered successfully' })
//         })
//     })
// })


// // login 
// app.post('/login', (req, res) => {
//     const { user_username, user_usertype, user_password } = req.body
    
//     const query = 'SELECT * FROM user WHERE user_username = ?'
//     db.query(query, [user_username], (err, result) => {
//         if (err) throw err;
//         if (result.length === 0) {
//             return res.status(401).json({ message: 'Invalid username or password' })
//         }
//         const user = result[0]
//         const isPasswordValid = bcrypt.compareSync(user_password, user.user_password)

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid username or password' })
//         }
//         const token = jwt.sign(
//             { 
//                 userId: user.user_id, 
//                 user_username: user.user_username, 
//                 user_usertype: user.user_usertype 
//             }, 
//             JWT_SECRET
//         )
//         res.json({ token })
//     })
// })



// app.listen(3001, () => {
//     console.log('Server is running on port 3001')
// })





