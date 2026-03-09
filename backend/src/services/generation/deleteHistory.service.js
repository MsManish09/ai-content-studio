
import { generationModel } from "../../models/Generations.model.js";
// import { UserModel } from "../../models/Users.model.js";

export default async function deleteHistoryService({userId, generationId}){

    // check if generation exist via generation id
    const generation = await generationModel.findById(generationId)
    if(!generation){
        throw new Error('History Not Found')
    }

    // check user authorization to delete the history
    if( !generation.userId.equals(userId) ){
        throw new Error('Deletion Not Allowed')
    }
    
    // if authorized
    await generationModel.deleteOne({_id: generationId})

    return 'History Deleted Successfully'

}