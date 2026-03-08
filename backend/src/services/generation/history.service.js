
import { generationModel } from "../../models/Generations.model.js";
import { UserModel } from "../../models/Users.model.js";

export default async function historyService({userId, page, limit}){

    // console.log('history services | userid: ', userId)

    const user = await UserModel.findById(userId)

    // if no user
    if(!user){
        throw new Error('user not found')
    }

    // if generation history -> find generation by id , limit - 20

    const skip = (page - 1) * limit // pagination

    // run both async opertions at the same time -> faster api response
    const [generations, total] = await Promise.all([
        generationModel
            .find({ userId })
            .select("_id prompt template createdAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        generationModel.countDocuments({ userId })
    ])

    // calculate total number of pages with limit
    const totalPages = Math.ceil( total / limit )
    return {
        generations,
        total,
        totalPages
    }

}