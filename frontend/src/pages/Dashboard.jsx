
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar.jsx"
import Sidebar from "../components/SideBar.jsx"
import { useSelector } from "react-redux"

export default function DashBoard(){

        const [isSidebarOpen, setIsSidebarOpen] = useState(false)
        const generationState  = useSelector((state)=> state.generation)

        // show generation results
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
            <div className="flex flex-col flex-1 ">

                <NavBar 
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                

                {/* Main workspace */}
                <div className="flex-1 p-6">

                    {/* Generated result */}
                    <div>

                    </div>

                    {/* Input area */}
                    <div>

                    </div>

                </div>

            </div>
            

        </div>
    )

}