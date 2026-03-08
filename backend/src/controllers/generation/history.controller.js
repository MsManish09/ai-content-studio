
import historyService from "../../services/generation/history.service.js";

export async function historyController(req, res, next){

    try {
        const userId = req.userId

        // extracting query params 
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20

        const {generations, total, totalPages} = await historyService({
            userId,
            page, 
            limit
        })

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages,
            data: generations
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}