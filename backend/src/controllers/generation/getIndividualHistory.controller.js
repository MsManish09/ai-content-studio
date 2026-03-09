import getIndividualHistoryService from "../../services/generation/getIndividualHistory.service.js";


export default async function getIndividualHistory(req, res, next){

    try{
        const result = await getIndividualHistoryService({
            userId: req.userId,
            generationId: req.params.id
        })

        res.status(200).json({
            success: true,
            data: result
        })
    }
    catch(error){
        res.status(404).json({
            message: error.message
        })
    }

}
