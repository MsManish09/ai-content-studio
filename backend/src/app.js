import express from 'express'
import authRoutes from './routes/authRoutes.js'

export const app = new express()

// middleware to parse JSON
app.use(express.json())

// routes
// app.use('/', (req, res)=>{
//     res.status(200).json({
//             message: 'home route'
//         })
// })
app.use('/api/auth', authRoutes) 



