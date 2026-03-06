import {app} from './src/app.js'
import {connectDB} from './src/config/db.js'
// load .env file
import dotenv from 'dotenv'


// load evironment variables
dotenv.config()

// connect to DB
connectDB()

const PORT = process.env.PORT || 8080

// start server
app.listen(PORT, ()=>{
    console.log('Server running on port ', PORT)
})


