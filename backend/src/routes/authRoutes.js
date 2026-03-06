
import express from 'express'
import { register } from '../controllers/auth/registerUser.controller.js'

const router = express.Router()

// register route ->  endpoint : /api/auth/register
router.post('/register', register)

// login route -> /api/auth/login
// router.post('/login', login)

// get current user -> /api/auth/me
// router.get('/me', me)


export default router
