import { UserModel } from "../../models/Users.model.js";


export default async function planUpgrade(userId){

    // console.log('Userid: ', userId)
    const user = await UserModel.findById(userId)
    // console.log('User: ', user)

    if(!user){
        throw new Error('User not found')
    }

    // if user already pro user
    if(user.plan == 'pro'){
        throw new Error('Pro plan already activated')
    }

    // update plan to pro 
    user.plan = 'pro'

    // save the update
    await user.save()

    // return updated uesr details
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