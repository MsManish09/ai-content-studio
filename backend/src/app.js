import express from 'express'
import authRoutes from './routes/authRoutes.js'
import GenerationRoutes from './routes/generation.routes.js'
import cors from 'cors'

export const app = new express()

// middleware to parse JSON
app.use(express.json())

// cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// routes
// app.use('/', (req, res)=>{
//     res.status(200).json({
//             message: 'home route'
//         })
// })
app.use('/api/auth', authRoutes) 
app.use('/api/', GenerationRoutes)



