
import { UserModel } from "../../models/Users.model.js";

// implement get me
export  async function getMeService({email}){

    const user = await UserModel.findOne({email})
    console.log('user', user)

    // if no user
    if(!user){
        throw new Error('Invalid email')
    }

    // else return user details
    return user


}