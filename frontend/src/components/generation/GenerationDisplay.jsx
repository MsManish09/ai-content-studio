
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { useSelector } from "react-redux"

export default function GenerationDisplay(){

    const { currentResponse , isLoading , error} = useSelector(
        (state)=>state.generation
    )

    if(error){
        return(
            <div className="w-full flex justify-center items-center p-6">
            
                <div className=" w-full max-w-2xl   bg-red-50  border border-red-400  border-l-8   border-l-red-600  rounded-lg  shadow-md  p-6 animate-fade-in ">

                    <div className="flex items-center gap-3">

                        <div className=" w-10 h-10  flex items-center justify-center  bg-red-100   text-red-600  rounded-full text-xl font-bold ">
                            !
                    </div>

                    <div>

                        <h2 className="text-red-700 text-lg font-semibold">
                            Generation Failed
                        </h2>

                        <p className="text-red-600 mt-1">
                                {error}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
    }

    return(

        <div className=" w-full max-w-4xl flex-1  min-h-[300px] max-h-[60vh] p-6 overflow-y-auto custom-scrollbar ">

            

            {/* empty state -> no generation request */}
            {!currentResponse && !isLoading && (

                <div className=" h-full flex flex-col justify-center items-center text-center text-(--color-text-muted) ">

                    <h2 className="text-xl font-semibold mb-2">
                        AI Content Studio
                    </h2>

                    <p>
                        Enter a prompt and generate AI content
                    </p>

                </div>

            )}

            {/* loading state -> while generaiton API is called */}

            {isLoading && (

                <div className="text-center">

                    Generating content...

                </div>

            )}

            {/* generation api  response */}

            {currentResponse && !isLoading && (

                <div className=" whitespace-pre-wrap text-(--color-text-on-primary) leading-relaxed ">

                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {currentResponse.data}
                    </ReactMarkdown>

                </div>

            )}

        </div>

    )

}