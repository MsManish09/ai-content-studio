
import { UserModel } from "../../models/Users.model.js";

// implement get me
export  async function getMeService(userId){

    const user = await UserModel.findById(userId)

    // if no user
    if(!user){
        throw new Error('User not found')
    }

    // reset usage limit for new day
    const today = new Date().toDateString()
    if(user.usageDate?.toDateString() !== today){
        user.usageCount = 0 
        user.tokensUsedToday = 0
        user.usageDate = new Date()
    }

    // else return user details
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        usageCount: user.usageCount,
        tokensUsedToday: user.tokensUsedToday,
        totalTokensUsed: user.totalTokensUsed
    }


}