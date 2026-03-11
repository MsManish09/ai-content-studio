
import loginUser from "../../services/auth/loginUser.js";

export async function login(req, res, next){

    try {
        const {token, user} = await loginUser(req.body)

        // set jwt token in httpOnly cookie
        res
        .cookie('token', token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200) // response status -> ok
        .json({
            success: true,
            user // send user 
        })
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
        next(error)
    }

}