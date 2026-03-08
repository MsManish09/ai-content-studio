
import historyService from "../../services/generation/history.service.js";

export async function historyController(req, res, next){

    try {
        const userId = req.userId
        const history = await historyService({userId})

        res.status(200).json({
            success: true,
            data: history
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}