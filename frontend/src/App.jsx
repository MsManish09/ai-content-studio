
import { loginUser } from './api/authAPI.js'
import './App.css'

function App() {

  const data = {
    email: "manish@test.com",
    password: "password123"
  }

  async function testLogin(){
    const res = await loginUser(data)
    console.log('REsponse: ', res)
  }

  testLogin()

  return (
    <>
      <h1 className=' m-3 bg-blue-700 text-xl text-yellow-400 text-center p-2 font-bold ' >app.jsx</h1>
    </>
  )
}

export default App
