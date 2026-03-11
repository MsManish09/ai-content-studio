import  { useState } from "react";
import { loginUser } from "../../api/authAPI.js";
import logo from '../../utils/ai-content-studio-logo.png'

export default function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function loginClick(e){
    e.preventDefault()

    const res = await loginUser({email, password})
    console.log('Login api resp: ', res)
  }
 

  return (
    <div className=" w-screen h-screen bg-(--color-primary) text-(--color-accent) ">

      {/* logo */}
        <div className=" w-full h-[15%] flex justify-center" >
          <img src={logo} alt="site logo" className=" h-[15vh] object-contain " />
        </div>

      {/* form */}
      <div className=" w-full h-[80vh] flex justify-center items-center" >
        
        <div className=" p-3 border border-solid border-(--color-accent-hover) w-[350px] flex flex-col items-center gap-3 rounded-2xl shadow-[0_0_15px_#6B7A90]" >
          
          {/* form header */}
          <h2 className=" text-[1.25rem] font-bold  " >Welcome Back</h2>

          {/* form main */}
          <form action="" id="loginForm" className=" w-full p-4 ">
            {/* email */}
            <div className=" w-full flex flex-col mb-2 gap-1" >
              <label htmlFor="loginFormEmailemail">Email: </label>
              <input type="email" id="loginFormEmail" required className=" bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none " onChange={(e)=>setEmail(e.target.value)} />
            </div>

            {/* password */}
            <div className=" w-full flex flex-col mb-2 gap-1">
              <label htmlFor="loginFormPassword">Password: </label>
              <input type="password" id="loginFormPassword" required className=" bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none " onChange={(e)=>setPassword(e.target.value)}  />
              
            </div>

            {/* login btn */}
            <button className=" w-full m-auto  bg-(--color-accent) hover:bg-(--color-accent-hover) p-2 text-(--color-primary-dark) font-bold rounded-[10px] hover:scale-95 mt-2 " onClick={loginClick} >Login</button>
          </form>

          {/* footer -> register link */}
          <div className=" border-t  border-solid border-(--color-accent) w-full p-4 flex justify-center"  >
            <p className=" text-(--color-accent-soft) ">Don't have an account? <span className=" text-(--color-accent) hover:text-(--color-accent-hover) hover:cursor-pointer " >Sign-up</span> </p>
          </div>
        </div>
      </div>

      

    </div>
  )
}

