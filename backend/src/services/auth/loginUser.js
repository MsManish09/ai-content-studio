
import { UserModel } from "../../models/Users.model.js";
import bycrpt from 'bcrypt'
import generateToken from "../../utils/genereateToken.js";

// implemnt user login
export default async function loginUser({email, password}){

    if(!email || !password){
        throw new Error('Invalid user cridentials')
    }

    // check if user exist
    const user = await UserModel.findOne({email})

    // if no user
    if(!user){
        throw new Error('Invalid email')
    }

    // if user exists -> compare password
    const passwordMatch = await bycrpt.compare(password, user.password )

    // if password wrong
    if(!passwordMatch){
        throw new Error('Invalid password')
    }

    // if password correct -> generate token
    const token = generateToken(user._id)

    // return token + filtered user data
    return{
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            usageCount: user.usageCount
        }
    }

}