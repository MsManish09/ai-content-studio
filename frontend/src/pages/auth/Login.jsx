import { useForm } from "react-hook-form"
import logo from '../../utils/ai-content-studio-logo.png'
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from "../../redux/authSlice"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login(){

  const {register, handleSubmit}  = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // login click -> loading display
  const {loading, error, isAuthenticated} = useSelector((state)=>state.auth)

  // if authenticated, navigate to dashboard
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated])
  

  async function onSubmit(data){
    const result = await dispatch(loginThunk(data))
    console.log('Thunk result: ', result)
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
          <form onSubmit={handleSubmit(onSubmit)} id="loginForm" className=" w-full p-4 ">
            {/* email */}
            <div className=" w-full flex flex-col mb-2 gap-1" >
              <label htmlFor="loginFormEmailemail">Email: </label>
              <input type="email" id="loginFormEmail" required className=" bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none " {...register("email")} />
            </div>

            {/* password */}
            <div className=" w-full flex flex-col mb-2 gap-1">
              <label htmlFor="loginFormPassword">Password: </label>
              <input type="password" id="loginFormPassword" required className=" bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none " {...register("password")}  />
              
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-2 text-center">
                {error}
              </div>
            )}

            {/* login btn */}
            <button type="submit" disabled={loading} className=" w-full m-auto  bg-(--color-accent) hover:bg-(--color-accent-hover) p-2 text-(--color-primary-dark) font-bold rounded-[10px] hover:scale-95 mt-2 " >{loading ? "Logging in..." : "Login"}</button>
          </form>

          {/* footer -> register link */}
          <div className=" border-t  border-solid border-(--color-accent) w-full p-4 flex justify-center"  >
            <p className=" text-(--color-accent-soft) ">Don't have an account? <Link to="/register"><span className=" text-(--color-accent) hover:text-(--color-accent-hover) hover:cursor-pointer " >Sign-up</span> </Link> </p>
          </div>
        </div>
      </div>

              
      

    </div>
  )
}

