
// load .env file
require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
// connect ot cloud DB
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log('DB connected...')
})
.catch((err)=>{
  console.log( err, 'DB connection failed....')
})

const PORT = process.env.PORT || 8080

// middleware to parse JSON
app.use(express.json())


// route
app.get('/', (req, resp)=>{
    resp.send('Server is running')
})

app.get("/api/users", (req, resp) => {
  resp.json({
    message: "Users API working"
  })
})

// start server
app.listen(PORT, ()=>{
    console.log('Server running on port ', PORT)
})


