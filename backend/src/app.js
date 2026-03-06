
const express = require('express')
const app = express()

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


// export app
module.exports = app