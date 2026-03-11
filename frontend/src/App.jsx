
import { getCurrentUser, loginUser } from './api/authAPI.js'
import './App.css'
import Login from './pages/auth/Login.jsx'

function App() {

  // async function getMe(){
  //   const res = await getCurrentUser()
  //   console.log('Get me cuurent user |  Response: ', res)
  // }
  // getMe()


  return (
    <>
      
      <Login></Login>
    </>
  )
}

export default App
