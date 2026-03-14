import { useEffect, useState } from 'react';
import logo from '../../utils/ai-content-studio-logo.png'

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../api/authAPI.js';
import { getMeThunk, registerThunk } from '../../redux/authSlice.js';
import WelcomeModal from '../../components/WelcomeModel.jsx';
import toast from 'react-hot-toast';
import { historyThunk } from '../../redux/generationSlice.js';


export default function Register(){

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmPassword] = useState(false)
  const authState = useSelector((state)=> state.auth)
  const [error, setError] = useState(authState.error)
  
  // modal state
  const [showWelcome, setshowWelcome] = useState(false)
  const [newUser,setNewUser] = useState(null)

  const {register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // reload when auht state changes
  useEffect(()=>{
    console.log('Auth state :', authState)
  }, [authState])



  // on click -> navigate to login page
  function handleloginNav(){
    navigate('/login')
  }


  async function onSubmit(data){
    console.log('registration form submitted | data', data)

    if(data.password !== data.confirmPassword){
      setError('Passwords do not match')
      return
    }

    setError(null)

    // call registration api layer
    try {

      console.log('data: ', data)
      
      await dispatch(registerThunk(data)).unwrap()

      toast.success("Registration successful  🎉")
      setNewUser(data)
      console.log('Nuew user: ', newUser)
      setshowWelcome(true)

    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      console.log('Error: ',error)
      setError(message )
      toast.error(message)
    }

  }

  return(
    <div className=' flex flex-col items-center bg-(--color-primary) w-[100vw] h-[100vh] ' >
      {/* logo */}
      <div className=' w-[200px] h-[15vh] ' >
        <img src={logo} alt="site logo" />
      </div>

      {/* form section */}
      <div className=" flex flex-col gap-2 p-4 rounded-2xl items-center border-2 border-solid border-(--color-accent) text-(--color-accent) w-[350px] shadow-[0_0_25px_#6B7A90] " >
        {/* header */}
        <div className=' text-center' >
          <h2 className=' text-[1.75rem] font-extrabold mb-3  ' >Create Account</h2>
          <p>Start Creating AI Content Today!</p>
        </div>

        {/* main -> form */}
        <form onSubmit={handleSubmit(onSubmit)} className=' w-[90%] ' >

            {/* name */}
          <div className=' flex flex-col gap-1  mb-2' >
            <label htmlFor="userName" className=' text-[1.25rem] font-bold ' >Name</label>
            <input {...register("name")} type="text" id="userName" required placeholder='Enter Your name' className=' p-2  bg-(--color-accent-soft) rounded text-(--color-primary-dark) border-2 border-solid border-(--color-text-secondary)  focus:border-(--color-accent-hover) outline focus:scale-105 ' />
          </div>

          {/* email */}
          <div className=' flex flex-col gap-1 mb-2 ' >
            <label htmlFor="userEmail" className=' text-[1.25rem] font-bold ' >Email</label>
            <input {...register("email")} type="email" id="userEmail" required placeholder='Enter your email' className=' p-2  bg-(--color-accent-soft) rounded text-(--color-primary-dark) border-2 border-solid border-(--color-text-secondary)  focus:border-(--color-accent-hover) outline focus:scale-105 ' />
          </div>

          {/* password */}
          <div className=' flex flex-col gap-1 mb-2 ' >
            <label htmlFor="userPass" className=' text-[1.25rem] font-bold ' >Password</label>
            <div className=' relative ' >
              <input type={showPassword ? "text" : "password" } id="userPass" required placeholder='Enter your password'
              
              className=' w-full p-2  bg-(--color-accent-soft) rounded text-(--color-primary-dark) border-2 border-solid border-(--color-text-secondary)  focus:border-(--color-accent-hover) outline focus:scale-105 outline-none ' {...register("password")}  />

              <span onClick={()=>setShowPassword(!showPassword)}  className=' absolute right-3 top-4 text-(--color-text-primary) ' >{showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}</span>

            </div>
          </div>

          {/* confirm password */}
          <div className=' flex flex-col gap-1 mb-2 ' >
            <label htmlFor="confirmPassword" className=' text-[1.25rem] font-bold ' >Confirm Password</label>
            <div className=' relative ' >
              <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" required placeholder='Confirm password'
              
              className=' w-full p-2  bg-(--color-accent-soft) rounded text-(--color-primary-dark) border-2 border-solid border-(--color-text-secondary)  focus:border-(--color-accent-hover) outline focus:scale-105 outline-none ' />

              <span onClick={()=>setConfirmPassword(!showConfirmPassword)}  className=' absolute right-3 top-4 text-(--color-text-primary) ' >{showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}</span>

            </div>
          </div>

          {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
          )}

          {/* sing up btn */}
          <button type='submit'  className=" w-full bg-(--color-accent) hover:bg-(--color-accent-hover) p-2 mt-2 mb-4 text-(--color-primary-dark) font-bold rounded-lg transition duration-200 hover:scale-95 text-[1.25rem] ">SignUp </button>

        </form>     

        {/* footer */}
        <div className=' border-t-2 border-solid border-(--color-accent) text-(--color-accent-soft) w-[90%] text-center p-3 ' >
          <h2 className=' text-[1.1rem] ' >Already have a account? <span className=' text-(--color-accent) hover:text-(--color-text-secondary) hover:bg-(--color-accent-hover) pl-2 pr-2 pt-1 pb-1 hover:cursor-pointer hover:font-bold' onClick={()=>{handleloginNav()}}  >Login</span> </h2>
        </div>
      </div>

      {/* welcome modal */}
      {showWelcome && (
        <WelcomeModal
          user={newUser}
          onClose={async ()=>{
            setshowWelcome(false)

            // if registration successful -> autologin
            await dispatch(getMeThunk()).unwrap()
          }}
        />
      )}
    </div>
  )

}