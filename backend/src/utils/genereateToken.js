
/*
    input → userId
    output → JWT token
 */

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// load evironment variables
dotenv.config()

const generateToken = (userId)=>{
    const token = jwt.sign(
        {userId}, // payload -> data encoded inside the token
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
    return token
}

export default generateToken