import { useEffect, useState } from "react"
import { generateThunk } from "../../redux/generationSlice.js"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

export default function UserInput(){

    const [prompt , setPrompt] = useState("")
    const [template , setTemplate] = useState("blog")
    const [err, setError] = useState(null)
    const dispatch = useDispatch()

    const generationState = useSelector((state)=> state.generation)
    const { isGenerating } = generationState

    useEffect(()=>{
        if(generationState.error){
            setError(generationState.error)
        }
    },[generationState.error])


    // generation funcitonlaity
    async function handleGenerate(){

        // preventing duplicate submission
        if(isGenerating){
            return
        }

        // prompt validation
        if(!prompt.trim()){
            alert("Prompt required")
            return
        }


        // console.log(prompt , template)
        try {
                const res = await dispatch( generateThunk({prompt, template}) ).unwrap()
                console.log('gneration res | user')
                // clear prompt input
                setPrompt("")

        } catch (error) {
            // console.log('user input | error:', error)
            setError(error)
            toast.error(error)
        }
    }


    return(

        <div className=" w-full max-w-3xl bg-(--color-primary-lighter) border border-(--color-border) rounded-xl p-4 shadow-sm ">

            <div className=" flex flex-col md:flex-row gap-3 w-full ">

                {/* Prompt */}

                <input type="text" placeholder="Ask AI to generatecontent..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} className=" w-full md:flex-1 px-4 py-3 rounded-lg border border-(--color-border)  bg-white outline-none focus:border-(--color-primary) " 
                // call api on 'enter'
                onKeyDown={(e)=>{if(e.key==="Enter"){
                            handleGenerate()
                        }
                    }} />

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

                    <button onClick={handleGenerate} disabled={isGenerating} className=" flex-1 md:flex-none px-6 py-3 rounded-lg bg-(--color-primary)  text-white font-medium hover:bg-(--color-primary-light) transition " >
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </button>

                </div>

            </div>

        </div>

    )

}