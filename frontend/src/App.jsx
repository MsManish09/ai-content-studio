import { Routes, Route, useNavigate } from "react-router-dom"
import './App.css'
import Login from './pages/auth/Login.jsx'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMeThunk } from "./redux/authSlice.js"
import FullScreenLoading from "./components/FullScreenLoading.jsx"
import Register from "./pages/auth/Register.jsx"
import ProctectedRoutes from "./routes/ProctectedRoutes.jsx"
import PublicRoutes from "./routes/PublicRoutes.jsx"
import DashBoard from "./pages/Dashboard.jsx"
import UserDetails from "./pages/auth/UserDetails.jsx"
import {Toaster} from "react-hot-toast"
import { generateThunk, historyThunk } from "./redux/generationSlice.js"

function App() {

  // dispatch getMeThunk() -> call getme api -> autologin - with valid jwt
  const dispatch = useDispatch()
  const authState  = useSelector( (state)=> state.auth )
  const generationState = useSelector((state)=>state.generation)
  const navigate = useNavigate()
  
  // auto login -> if valid jwt token (session restore)
  useEffect(()=>{
    const res = dispatch(getMeThunk())
    console.log('getmeThunk | response: ', res)
    console.log('Auth state :', authState)
  }, [])

  // if user is logged in  ->  load history
  useEffect(()=>{
    if(authState.user){
      dispatch(historyThunk())
    }
  }, [authState.user])

  // when ever current response changes -> call history api -> to update history component
  useEffect(()=>{
    if(generationState.currentResponse){
      dispatch( historyThunk() )
    }
  }, [generationState.currentResponse])
  

  // display loading, while authenticating
  if(authState.isCheckingAuth){
    return <FullScreenLoading />
  }

  return (
    <>

      <Toaster
        position="top-right"
        toastOptions={{
          duration:3000
        }}
      />
    
      <Routes>

        <Route path='/' element={
          <ProctectedRoutes>
            <DashBoard />
          </ProctectedRoutes>
        } />

        <Route path="/login" element={<PublicRoutes>
          <Login />
        </PublicRoutes>} /> 

        <Route path="/register"element={<PublicRoutes>
            <Register />
        </PublicRoutes>} /> 

        <Route 
          path="/profile" 
          element={
            <ProctectedRoutes>
              <UserDetails />
            </ProctectedRoutes>
          } 
        />



      </Routes>

    </>
    
  )
}

export default App
