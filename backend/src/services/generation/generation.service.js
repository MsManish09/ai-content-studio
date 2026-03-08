import { UserModel } from "../../models/Users.model.js";
import { generationModel } from "../../models/Generations.model.js";

export default async function generationService({userId,prompt, template}){

    if(!prompt || prompt.trim().length == 0 || !template){
        throw new Error('Invalid inputs')
    }

    // make sure user exist
    const user = await UserModel.findById(userId)

    // if no user
    if(!user){
        throw new Error('User not found')
    }

    // reset usage limit for new day
    const today = new Date().toDateString()
    if(user.usageDate?.toDateString() !== today){
        user.usageCount = 0 
        user.usageDate = new Date()
    }

    // plan and usage check
    if(user.plan.toLowerCase() === 'free'){

        // if usage limit exceeded
        if(user.usageCount >= 10){
            throw new Error('Daily usage limit exceeded')
        }

    }

    const formattedPrompt = promptBuilder(prompt, template)

    // call openAI and send formatted prompt

    // const {result, tokensUsed} = ''
    const result = 'ai generation coming soon'
    const tokensUsed = 0

    // create generation document (in atlas)
    const generated = await  generationModel.create({
        userId,
        prompt, 
        template,
        result,
        tokensUsed, // later update it
        model: 'gpt-4o-mini' // later update it
    })

    // update count and save
    user.usageCount += 1
    await user.save()

    // return result
    return result


}


// funciton to build proper prompt
function promptBuilder(prompt, template){

    if(template.toLowerCase() === 'instagram'){
        return `Write a catchy instagram caption about ${prompt} using emojis`
    }

    if(template.toLowerCase() === 'blog'){
        return `Write a desciptive and detailed blog post about ${prompt}. Be concise and use simple language, so that anyone can easily understand it.`
    }

    if(template.toLowerCase() === 'linkedin'){
        return `Write a professional linkedin post about ${prompt}. Be concise and use simple words`
    }

    throw new Error('Invalid template')

}