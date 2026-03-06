
import loginUser from "../../services/auth/loginUser.js";

export async function login(req, res, next){

    try {
        const {token, user} = await loginUser(req.body)

        // 200 -> ok
        res.status(200).json({
            success: true,
            token,
            user
        })
    } catch (error) {
        next(error)
    }

}