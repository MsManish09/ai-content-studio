
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { generationController } from '../controllers/generation/generation.controller.js'
import { historyController } from '../controllers/generation/history.controller.js'
import deleteHistoryController from '../controllers/generation/deleteHistory.controller.js'

const GenerationRoutes = express.Router()

// POST /api/generate
GenerationRoutes.post('/generate', authMiddleware, generationController)

//GET /api/history
GenerationRoutes.get('/history', authMiddleware, historyController )

//  DELETE /api/history/:id
GenerationRoutes.delete('/history/:id', authMiddleware, deleteHistoryController)


export default GenerationRoutes