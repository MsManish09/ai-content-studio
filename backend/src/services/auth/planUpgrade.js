import { UserModel } from "../../models/Users.model.js";


export default async function planUpgrade(userId){

    const user = await UserModel.findById(userId)

    // if no user found
    if (!user) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    // already pro plan
    if (user.plan === "pro") {
        const error = new Error(
            "Pro plan already activated"
        )

        error.statusCode = 409
        throw error
    }

    // update plan to pro 
    user.plan = 'pro'

    // plan update time stamp + plan expiration calculation
    const now = new Date()

    const expiresAt = new Date(now)
    expiresAt.setDate( expiresAt.getDate() + 365 )

    user.planUpgradedAt = now
    user.planExpiresAt = expiresAt

    // save the update
    await user.save()

    // return updated uesr details
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
    }
}