
const mongoose = require('mongoose')

// connect ot cloud DB
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected...')
    } catch (error) {
        console.log('DB connection failed: ', error)

        // exit process if connection failed
        process.exit(1)
    }
}

// export connect db
module.exports = connectDB
