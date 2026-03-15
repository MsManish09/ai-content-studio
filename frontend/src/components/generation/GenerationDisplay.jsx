
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { useSelector } from "react-redux"

export default function GenerationDisplay(){

    const { currentResponse , isLoading } = useSelector(
        (state)=>state.generation
    )

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