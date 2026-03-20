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
  useEffect(() => {
    console.log("Auth state :", authState);
  }, [authState]);

  // on click -> navigate to login page
  function handleloginNav(){
    navigate('/login')
  }

 //registration fn 
  async function onSubmit(data){
    // console.log('registration form submitted | data', data)

    if(data.password !== data.confirmPassword){
      setError('Passwords do not match')
      return
    }

    setError(null)

    // call registration api layer
    try {

      await dispatch(registerThunk(data)).unwrap()
      toast.success("Registration successful  🎉")
      setNewUser(data)
      setshowWelcome(true)

    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      setError(message )
      toast.error(message)
    }

  }

  return(
    <>
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg-primary) text-(--color-text-primary) px-4">
          <div className="w-full max-w-2xl">
            <div className="bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl shadow-sm px-7 py-8 sm:px-10 sm:py-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src={logo}
                    alt="AI Content Studio"
                    className="h-7 w-auto opacity-90"
                  />
                  <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-(--color-text-muted)">
                    AI Content Studio
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleloginNav}
                  className="text-xs text-(--color-text-muted) hover:text-(--color-primary-light) underline-offset-2 hover:underline transition hover:cursor-pointer" >
                  Already have an account?
                </button>

              </div>

              {/* Title + subtitle */}
              <div className="mb-7">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  Start creating AI content today
                </h1>
                <p className="text-sm text-(--color-text-muted) mt-2">
                  Create an account to access your personalized workspace, history
                  and saved generations.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" >

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-(--color-text-secondary)">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg bg-(--color-bg-tertiary) border border(--color-border) px-3.5 py-2.5 text-sm outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) placeholder:text-(--color-text-muted) transition"
                    {...register("name", { required: true })}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-(--color-text-secondary) ">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-lg bg-(--color-bg-tertiary) border border-(--color-border) px-3.5 py-2.5 text-sm outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) placeholder:text-(--color-text-muted) transition"
                    {...register("email", { required: true })}
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-(--color-text-secondary)">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="w-full rounded-lg bg-(--color-bg-tertiary) border border-(--color-border) px-3.5 py-2.5 pr-9 text-sm outline-none focus:border-(--color-accent) focus:ring-1 focus:ring(--color-accent) placeholder:text-(--color-text-muted) transition"
                      {...register("password", { required: true, minLength: 6 })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2.5 flex items-center text-(--color-text-muted) hover:text-(--color-primary-light) transition"
                    >
                      {showPassword ? (
                        <IoEyeOffOutline className="h-4 w-4" />
                      ) : (
                        <IoEyeOutline className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-(--color-text-secondary) ">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      className="w-full rounded-lg bg-(--color-bg-tertiary) border border-(--color-border) px-3.5 py-2.5 pr-9 text-sm outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) placeholder:text-(--color-text-muted) transition"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2.5 flex items-center text-(--color-text-muted) hover:text-(--color-primary-light) transition"
                    >
                      {showConfirmPassword ? (
                        <IoEyeOffOutline className="h-4 w-4" />
                      ) : (
                        <IoEyeOutline className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="sm:col-span-2 text-xs text-(--color-error) bg-(--color-bg-tertiary) border border-[(--color-error)/40] rounded-md px-3 py-2">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={authState.loading}
                    className={`w-full inline-flex items-center justify-center rounded-lg px-3.5 py-2.5 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer
                      bg-(--color-primary) text-(--color-text-on-primary)
                      hover:bg-(--color-accent-hover) hover:text-(--color-text-on-primary) `}
                  >
                    {authState.loading ? "Creating your account..." : "Create account"}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-(--color-text-muted)">
                <span>Already have an account? </span>
                <button className="text-(--color-primary) hover:text-(--color-accent-hover) underline-offset-2 hover:underline transition hover:cursor-pointer  " >
                  Sign in
                </button>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] text-(--color-text-muted)">
              By creating an account, you agree to our Terms and acknowledge our
              Privacy Policy.
            </p>
          </div>
      </div> 

      {/*  welcome modal */}
      {showWelcome && (
        <WelcomeModal
            isOpen={showWelcome}
            onClose={() => setshowWelcome(false)}
            user={newUser} />
      )} 
    </>
  )

}

