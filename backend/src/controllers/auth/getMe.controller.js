
import {getMeService} from "../../services/auth/getMe.js";

export async function getMe(req, res, next){

    try {
        const user = await getMeService(req.userId)

        // 200 -> ok
        res.status(200).json({
            user
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}