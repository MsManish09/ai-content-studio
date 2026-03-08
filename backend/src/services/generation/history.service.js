
import { generationModel } from "../../models/Generations.model.js";
import { UserModel } from "../../models/Users.model.js";

export default async function historyService({userId}){

    // console.log('history services | userid: ', userId)

    const user = await UserModel.findById(userId)

    // if no user
    if(!user){
        throw new Error('user not found')
    }

    // if generation history -> find generation by id , limit - 20
    const generations =  await generationModel
    .find({userId})
    .select("prompt template createdAt") // only return prompt, template, generation id and created time
    .sort({createdAt: -1})
    .limit(20)
    
    console.log('Generation history: ', generations)

    return generations

}