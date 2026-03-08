
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next){

    // extract request header
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            message: 'Authorization header missing'
        })
    }

    // extract token from header
    const token = authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({
            message: 'Token missing'
        })
    }

    try {

        // verify the jwt token -> use jwt secreat key
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        
        // attach the token data to the request
        req.userId = decoded.userId
        
        next()
        
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }

}