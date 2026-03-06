
// load .env file
require('dotenv').config()

// import app from app.js
const app = require('./src/app.js')

// connect to DB
const connectDB = require('./src/config/db.js')
connectDB()

const PORT = process.env.PORT || 8080

// start server
app.listen(PORT, ()=>{
    console.log('Server running on port ', PORT)
})


