import GenerationDisplay from "./generation/GenerationDisplay";
import UserInput from "../components/generation/UserInput.jsx"


export default function MainWorkspace(){

    return(
        <div className="flex flex-1 p-6 w-full h-[80vh] flex-col justify-center items-center  gap-[2rem] ">

            {/* generation display component */}
                <GenerationDisplay />


            {/* Input area */}
                <UserInput />
                    

        </div>
    )

}