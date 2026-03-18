import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { individualGenerationDetails } from "../api/generationAPI.js"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useEffect, useState } from "react"
import { MdCopyAll } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5"
import FullScreenLoading from '../components/FullScreenLoading.jsx'
import InfoCard from "../components/InfoCard.jsx"


export default function ContentDetailsPage(){

    const { id } = useParams()
    let [generation, setGeneration ]= useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        getDetails()
    }, [id])


    async function getDetails(){
        try {
            const res = await individualGenerationDetails(id)
            setGeneration (res.data)
        } catch (err) {
            toast.error(err?.message)
        }
    }
    

    // copy to clickboard functionality
    function copyToClipboard(){

        navigator.clipboard.writeText(
            generation.result
        )
        toast.success('Copied')

    }

    if(generation === null){
        return <FullScreenLoading />
    }

    // if not generatio detials
     if(!generation){
        NotFound()
        return 
    }



    return (
        <div className="w-full h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar p-4 md:p-6">

            {/* Metadata */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

                <InfoCard title="Model" value={generation.model}/>
                <InfoCard title="Template" value={generation.template}/>
                <InfoCard title="Tokens" value={generation.tokensUsed}/>
                <InfoCard title="Created" value={ new Date( generation.createdAt ).toLocaleString() } />

            </div>

            {/* contnet */}
            <div className=" text-gray-200 relative bg-(--color-primary-lighter) p-5 md:p-6 rounded-xl border mb-6">

                {/* back btn */}
                <div className="flex items-start gap-3 mb-4 ">

                    <IoArrowBack onClick={()=>navigate('/')} className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                    
                </div>

                {/* copy btn */}
                <div className="absolute  top-4 right-4 gap-4 z-10">

                    <MdCopyAll onClick={copyToClipboard} className="w-6 h-6 cursor-pointer hover:scale-110 transition" />

                </div>

                <h2 className="text-lg md:text-xl py-2 font-semibold wrap-break-words text-(--color-accent) ">
                        PROMPT: {generation.prompt}
                    </h2>

                <ReactMarkdown  remarkPlugins={[remarkGfm]}>
                    {generation.result}
                </ReactMarkdown>

            </div>
        </div>
    )

}

function NotFound(){

    return(
        <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center p-6">
            <div className="bg-red-50 border border-red-200 text-red-500 p-6 rounded-xl text-center max-w-md w-full">
                
                <p className="text-lg font-semibold mb-2">
                    Content not found
                </p>

                <p className="text-sm text-red-400 mb-4">
                    The requested generation may have been deleted or does not exist.
                </p>

                <IoArrowBack onClick={()=>navigate('/')}
                    className=" text-white px-4 py-2 rounded-lg hover:scale-105 transition" >
                    Go Back
                </IoArrowBack>

            </div>
        </div>
    )

}