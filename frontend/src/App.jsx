import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import './App.css'
import Login from './pages/auth/Login.jsx'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Dashboard from "./pages/Dashboard.jsx"
import { getMeThunk } from "./redux/authSlice.js"
import FullScreenLoading from "./components/FullScreenLoading.jsx"

function App() {

  // dispatch getMeThunk() -> call getme api -> autologin - with valid jwt
  const dispatch = useDispatch()
  const authState  = useSelector( (state)=> state.auth )
  const navigate = useNavigate()
  
  // auto login -> if valid jwt token
  // useEffect(()=>{
  //   const res = dispatch(getMeThunk())
  //   console.log('getmeThunk | response: ', res)
  // }, [])

  useEffect(()=>{
    console.log('Redux State updated :', authState)

    if(authState.isAuthenticated){
      navigate('/')
    }
    else{
      navigate('/login')
    }

  }, [authState])

  // display loading, while authenticating
  // if(authState.isCheckingAuth){
  //   return <FullScreenLoading />
  // }

  return (
    
      <Routes>

        {/* proctected pages */}
        <Route path='/' element={<Dashboard />} />
        {/* proctected page end */}

        <Route path="/login" element={<Login />} /> {/* /login loads first. */}

      </Routes>
    
  )
}

export default App
