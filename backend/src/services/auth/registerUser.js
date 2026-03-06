
import { UserModel } from "../../models/Users.model.js";
import bcrypt from 'bcrypt'
import generateToken from "../../utils/genereateToken.js";

// implement user register

export default async function registerUser({name, email, password}){

    // check if user email already exist
    const existingUser =  await UserModel.findOne({email})

    // if user exist throw error
    if(existingUser){
        throw new Error('User already exists')
    }

    // else
        // hash password
        const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password, salt)

    // create user 
    console.log("Creating user in DB...");
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
    })

    // after creating user -> generete token
    const token  = generateToken(user._id)

    // return token + filtered user
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

