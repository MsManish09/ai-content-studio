
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar.jsx"
import Sidebar from "../components/SideBar.jsx"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import MainWorkspace from "../components/MainWorkspace.jsx"
import ContentDetailsPage from "./ContentDetailsPage.jsx"


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
                <div>
                    <Routes>
                        <Route path="/" element={<MainWorkspace/>}/>
                        <Route path="/generation/:id" element={<ContentDetailsPage/>}/>
                    </Routes>
                </div>

            </div>
            

        </div>
    )

}