
import {getMeService} from "../../services/auth/getMe.js";

export async function getMe(req, res, next){

    try {
        const user = await getMeService(req.body)

        // 200 -> ok
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        next(error)
    }

}