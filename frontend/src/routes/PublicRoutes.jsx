import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


export default function PublicRoutes({children}){

    const {isAuthenticated, isCheckingAuth} = useSelector((state)=>state.auth)

    if(isCheckingAuth){
        return <FullScreenLoading/>
    }

    if(isAuthenticated){
        return <Navigate to="/" />
    }

    

    return children

}