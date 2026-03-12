import { useDispatch, useSelector } from "react-redux"
import {  logoutThunk } from "../redux/authSlice.js"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function DashBoard(){

    const dispatch = useDispatch()
    const authState = useSelector((state)=> state.auth)
    // const navigate  = useNavigate()


    // useEffect(()=>{
    //     console.log('Auth state: ', authState)
    // }, [authState])

    
    async function handleLogout(){
        
        // call logout thunk
        dispatch(logoutThunk())
    }

    return(
        <div className=" w-[100vw] h-[100vh] bg-(--color-primary) flex justify-center items-center " >

            <h1 className=" text-[2.5rem] text-(--color-accent-hover) font-extrabold " > DashBoard </h1>

            <button className=" bg-(--color-accent) p-3 text-[1.25rem] font-bold m-4 hover:scale-95 " onClick={()=> handleLogout()} >Logout</button>

        </div>
    )

}