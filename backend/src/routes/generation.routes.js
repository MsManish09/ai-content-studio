
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { generationController } from '../controllers/generation/generation.controller.js'

const GenerationRoutes = express.Router()

// POST /api/generate
GenerationRoutes.post('/generate', authMiddleware, generationController)


export default GenerationRoutes