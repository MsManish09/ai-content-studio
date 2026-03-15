
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar.jsx"
import Sidebar from "../components/SideBar.jsx"
import { useSelector } from "react-redux"
import UserInput from "../components/generation/UserInput.jsx"
import GenerationDisplay from "../components/generation/GenerationDisplay.jsx"

export default function DashBoard(){

        const [isSidebarOpen, setIsSidebarOpen] = useState(false)
        const generationState  = useSelector((state)=> state.generation)

        // show generation history results
        useEffect(()=>{
            console.log('Generation State: ', generationState)
        },[generationState])


    return(
        <div className="flex w-[100vw] h-[100vh] bg-(--color-primary) relative" >


            {/* mobile overlay */}
            {isSidebarOpen && (
                <div
                     className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={()=>setIsSidebarOpen(false)}
                ></div>
            )}

            {/* side bar -> history  */}
            <Sidebar 
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* Main Area */}
            <div className="flex flex-col flex-1 w-full  ">

                <NavBar 
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                

                {/* Main workspace */}
                <div className="flex flex-1 p-6 w-full h-[80vh] flex-col justify-center items-center  gap-[2rem] ">

                    {/* generation display component */}
                        <GenerationDisplay />

                    {/* Generated result */}
                    {/* <div className=" max-h-[60vh] p-4 w-[80%] text-(--color-text-on-primary) overflow-y-auto custom-scrollbar " >

                        
                        
                    </div> */}

                    {/* Input area */}
                        <UserInput />
                    

                </div>

            </div>
            

        </div>
    )

}