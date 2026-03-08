
import express from 'express'
import authMiddleware from '../middlewares/authMiddleware'
import { generationController } from '../controllers/generation/generation.controller.js'

const router = express.Router()

// POST /api/generate
router.post('/generate', authMiddleware, generationController)


export default router