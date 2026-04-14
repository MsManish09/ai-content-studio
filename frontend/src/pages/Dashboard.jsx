
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
        <div className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">

            <div className="flex min-h-screen">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <div className="flex flex-1 flex-col min-w-0">
                    <NavBar setIsSidebarOpen={setIsSidebarOpen} />

                    <main className="flex-1 bg-(--color-bg-primary)">
                        <div className="h-full px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
                            <div className="h-full rounded-2xl border border-(--color-border) bg-(--color-bg-secondary) overflow-hidden">
                            <Routes>
                                <Route path="/" element={<MainWorkspace />} />
                                <Route path="/generation/:id" element={<ContentDetailsPage />} />
                            </Routes>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )

}