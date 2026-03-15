import { useEffect, useState } from "react"
import { generateThunk } from "../../redux/generationSlice.js"
import { useDispatch, useSelector } from "react-redux"

export default function GenerateInput(){

    const [prompt , setPrompt] = useState("")
    const [template , setTemplate] = useState("blog")
    const [err, setError] = useState(null)
    const dispatch = useDispatch()

    const generationState = useSelector((state)=> state.generation)

    useEffect(()=>{
        if(generationState.error){
            setError(generationState.error)
        }
    },[generationState.error])

    async function handleGenerate(){
        console.log(prompt , template)
        try {
            
            const res = await dispatch( generateThunk({prompt, template}) ).unwrap()
            console.log('generation thunk response: ', res)

        } catch (error) {
            console.log('user input | error:', error)
            setError(error)
            console.log('Error usestate: ', err)
        }
    }

    return(

        <div className=" w-full max-w-3xl bg-(--color-primary-lighter) border border-(--color-border) rounded-xl p-4 shadow-sm ">

            <div className=" flex flex-col md:flex-row gap-3 w-full ">

                {/* Prompt */}

                <input type="text" placeholder="Ask AI to generatecontent..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} className=" w-full md:flex-1 px-4 py-3 rounded-lg border border-(--color-border)  bg-white outline-none focus:border-(--color-primary) "/>

                {/* Controls row */}

                <div className=" flex gap-3 w-full md:w-auto ">

                    {/* Template */}

                    <select
                    value={template}
                    onChange={(e)=>setTemplate(e.target.value)} className=" flex-1 md:w-40 px-3 py-3 rounded-lg border border-(--color-border) bg-white cursor-pointer ">

                        <option value="blog">Blog</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="tweet">Tweet</option>
                        <option value="email">Email</option>

                    </select>

                    {/* Button */}

                    <button
                    onClick={handleGenerate}
                    className=" flex-1 md:flex-none px-6 py-3 rounded-lg bg-(--color-primary)  text-white font-medium hover:bg-(--color-primary-light) transition " >
                        Generate
                    </button>

                </div>

            </div>

        </div>

    )

}