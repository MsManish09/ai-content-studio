
import registerUser from "../../services/auth/registerUser.js";

export async function register(req, res, next){

    try {
        const {token, user} = await registerUser(req.body)

        //201 -> created
        res
        .cookie('token', token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(201).json({
            success: true, 
            user
        })
    } catch (error) {
        next(error)
    }

} 