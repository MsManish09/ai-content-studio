
import express from 'express'
import { register } from '../controllers/auth/registerUser.controller.js'
import { login } from '../controllers/auth/loginUser.controller.js'
import { getMe } from '../controllers/auth/getMe.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import logoutUser from '../controllers/auth/logoutUser.controller.js'

const router = express.Router()

// register route ->  endpoint : POST /api/auth/register
router.post('/register', register)

// login route -> POST /api/auth/login
router.post('/login', login)

// get current user -> GET /api/auth/me
router.get('/me', authMiddleware, getMe)

// logout user -> POST /api/auth/logout
router.post('/logout', logoutUser)


export default router
