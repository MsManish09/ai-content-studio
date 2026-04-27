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
    

    function copyToClipboard(){
        navigator.clipboard.writeText(
            generation.result
        )
        toast.success('Copied')
    }

    if(generation === null){
        return <FullScreenLoading />
    }

     if(!generation){
        NotFound()
        return 
    }

    return (
        <div className="w-full min-h-[calc(100vh-70px)] overflow-y-auto bg-(--color-bg-primary) px-4 md:px-10 py-8">

            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <InfoCard title="Model" value={generation.model}/>
                <InfoCard title="Template" value={generation.template}/>
                <InfoCard title="Tokens" value={generation.tokensUsed}/>
                <InfoCard title="Created" value={ new Date( generation.createdAt ).toLocaleString() } />
            </div>

            {/* content */}
            <div className="relative bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.6)] p-6 md:p-8 mb-6">

                {/* back btn */}
                <div className="flex items-center gap-3 mb-5">
                    <IoArrowBack 
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate("/"); // fallback -> home page
                            }
                        }} 
                        className="w-5 h-5 text-(--color-text-muted) cursor-pointer hover:text-(--color-primary-light) transition-colors duration-200" 
                    />
                </div>

                {/* copy btn */}
                <div className="absolute top-5 right-5">
                    <MdCopyAll 
                        onClick={copyToClipboard} 
                        className="w-5 h-5 text-(--color-text-muted) cursor-pointer hover:text-(--color-primary-light) transition-colors duration-200" 
                    />
                </div>

                <h2 className="text-base md:text-lg font-medium text-(--color-text-primary) mb-5 break-words tracking-tight">
                    PROMPT: {generation.prompt}
                </h2>

                {/* react markdown -> text formating */}
                <div className="prose prose-invert prose-sm md:prose-base max-w-none text-(--color-text-secondary) ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {generation.result}
                    </ReactMarkdown>
                </div>

            </div>
        </div>
    )
}

function NotFound(){

    return(
        <div className="w-full min-h-[calc(100vh-70px)] flex items-center justify-center bg-(--color-bg-primary) p-6">

            <div className="bg-(--color-bg-secondary) border border-(--color-border) shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-center p-8 rounded-2xl max-w-md w-full">
                
                <p className="text-lg font-semibold text-(--color-text-primary) mb-2">
                    Content not found
                </p>

                <p className="text-sm text-[(--color-text-muted)] mb-6">
                    The requested generation may have been deleted or does not exist.
                </p>

                <IoArrowBack  onClick={()=>navigate('/')} className="mx-auto w-5 h-5 text-(--color-text-secondary) cursor-pointer hover:text-(--color-primary-light) transition-co duration-200"  />
            </div>
        </div>
    )
}