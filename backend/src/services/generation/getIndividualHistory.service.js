import { generationModel } from "../../models/Generations.model.js";


export default async function getIndividualHistoryService({userId, generationId}){

    const generation = await generationModel.findOne({
        _id: generationId,
        userId: userId
    }).lean() // mongoose overhead not needed

    // if no generation
    if(!generation){
        throw new Error('History Not Found')
    }

    // else -> return history
    return generation

}