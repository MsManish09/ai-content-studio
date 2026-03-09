import deleteHistoryService from "../../services/generation/deleteHistory.service.js";

export default async function deleteHistoryController(req, res, next){

    try {
        const response =  await deleteHistoryService({
            userId : req.userId,
            generationId: req.params.id
        })

        res.status(200).json({
            success: true,
            data: response
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}