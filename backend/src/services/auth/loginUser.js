
import { UserModel } from "../../models/Users.model.js";
import bycrpt from 'bcrypt'
import generateToken from "../../utils/genereateToken.js";

// implemnt user login
export default async function loginUser({email, password}){

    console.log('Email : ', email)
    console.log('Password: ', password)

    if(!email || !password){
        throw new Error('Invalid email or password')
    }

    // check if user exist
    const user = await UserModel.findOne({email})
    console.log('user: ', user)

    // if no user
    if(!user){
        throw new Error('Invalid email or password')
    }

    // if user exists -> compare password
    const passwordMatch = await bycrpt.compare(password, user.password )

    // if password wrong
    if(!passwordMatch){
        throw new Error('Invalid email or password')
    }

    // if password correct -> generate token
    const token = generateToken(user._id)

    // reset usage limit for new day
    const today = new Date().toDateString()
    if(user.usageDate?.toDateString() !== today){
        user.usageCount = 0 
        user.tokensUsedToday = 0
        user.usageDate = new Date()
    }

    // return token + filtered user data
    return{
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            usageCount: user.usageCount,
            tokensUsedToday: user.tokensUsedToday,
            totalTokensUsed: user.totalTokensUsed
        }
    }

}