import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


export default function ProctectedRoutes({children}){

    const {isAuthenticated, isCheckingAuth} = useSelector((state)=>state.auth)

    if(isCheckingAuth){
        return null
    }

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    return children
}