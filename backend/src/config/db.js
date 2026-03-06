import mongoose from 'mongoose'


// connect ot cloud DB
export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected...')
    } catch (error) {
        console.log('DB connection failed: ', error)

        // exit process if connection failed
        process.exit(1)
    }
}


