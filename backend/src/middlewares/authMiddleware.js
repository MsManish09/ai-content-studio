
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next){

    // extract jwt token form httponly cookie
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: 'Not Authenticated'
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