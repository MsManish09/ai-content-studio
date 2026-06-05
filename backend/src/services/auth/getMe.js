
import { UserModel } from "../../models/Users.model.js";

// implement get me
export  async function getMeService(userId){

    const user = await UserModel.findById(userId)

    // if no user
    if(!user){
        throw new Error('User not found')
    }

    // pro plan auto expiration -> after 365 days.
    if( user.plan === 'pro' && user.planExpiresAt && planExpiresAt < new Date() ){
        user.plan = 'free'
        user.planUpgradedAt = null
        user.planExpiresAt = null
    }

    // reset usage limit for new day
    const today = new Date().toDateString()
    if(user.usageDate?.toDateString() !== today){
        user.usageCount = 0 
        user.tokensUsedToday = 0
        user.usageDate = new Date()
    }

    // return user details
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        planUpgradedAt: user.planUpgradedAt,
        planExpiresAt: user.planExpiresAt,
        usageCount: user.usageCount,
        tokensUsedToday: user.tokensUsedToday,
        totalTokensUsed: user.totalTokensUsed
    }


}