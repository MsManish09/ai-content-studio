import { useDispatch, useSelector } from "react-redux"
import {  logoutThunk } from "../redux/authSlice.js"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.jsx"

export default function DashBoard(){


    return(
        <div className=" w-[100vw] h-[100vh] bg-(--color-primary) relative" >

            <NavBar />

            <h1 className=" text-[2.5rem] text-(--color-accent-hover) font-extrabold " > DashBoard </h1>

        </div>
    )

}