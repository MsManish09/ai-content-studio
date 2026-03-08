
import { UserModel } from "../../models/Users.model.js";

// implement get me
export  async function getMeService(userId){

    const user = await UserModel.findById(userId)

    // if no user
    if(!user){
        throw new Error('User not found')
    }

    // else return user details
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        usageCount: user.usageCount
    }


}