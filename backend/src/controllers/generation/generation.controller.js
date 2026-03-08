
import generationService from "../../services/generation/generation.service.js";

export async function generationController(req, res, next){

    try {
        
        const result = await generationService({
            userId : req.userId, 
            prompt: req.body.prompt, 
            template: req.body.template
        })

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}