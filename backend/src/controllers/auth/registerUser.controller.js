
import registerUser from "../../services/auth/registerUser.js";

export async function register(req, res, next){

    try {
        const {token, user} = await registerUser(req.body)

        res.status(201).json({
            success: true, 
            token,
            user
        })
    } catch (error) {
        next(error)
    }

} 