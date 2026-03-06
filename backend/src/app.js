import express from 'express'
import authRoutes from './routes/authRoutes.js'

export const app = new express()

// middleware to parse JSON
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)



