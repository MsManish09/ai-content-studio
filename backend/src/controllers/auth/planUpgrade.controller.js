import planUpgrade from "../../services/auth/planUpgrade.js";

export default async function planUpgradeController(req, res, next){


    try {
        const result = await planUpgrade( req.userId )

        res.status(200).json({
            success: true,
            data: result
        })
        
    } catch(error){
        res.status(
            error.statusCode || 500
        ).json({
            message: error.message
        })
    }
}