import { useForm } from "react-hook-form"
import logo from '../../utils/ai-content-studio-logo.png'
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from "../../redux/authSlice"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { historyThunk } from "../../redux/generationSlice";

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
    
    try {
      const result = await dispatch(loginThunk(data)).unwrap()
      console.log('Thunk result: ', result)
      toast.success("Login Successful")
    } catch (error) {
      const message = error.response?.data?.message || 'login failed'
      console.log('Error loging-In :', error)
      toast.error(message)
    }

    // toast.error(message)

  }
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg-primary) text-(--color-text-primary) px-4">

      <div className="w-full max-w-md">

        <div className="bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl shadow-sm px-7 py-8 sm:px-8 sm:py-10">

          {/* Logo + title */}
          <div className="flex flex-col items-center gap-3 mb-8">

            <div className="h-10 flex items-center">

              <img
                src={logo}
                alt="AI Content Studio"
                className="h-8 w-auto opacity-90"
              />

            </div>

            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-(--color-text-muted) mt-1.5">
                Sign in to continue creating content.
              </p>
            </div>
            
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-(--color-text-secondary)">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg bg-(--color-bg-tertiary) border border-(--color-border) px-3.5 py-2.5 text-sm outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) placeholder:text-(--color-text-muted) transition"
                {...register("email", { required: true })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-(--color-text-secondary) ">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-lg bg-(--color-bg-tertiary) border border-(--color-border) px-3.5 py-2.5 text-sm outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) placeholder:text-(--color-text-muted) transition"
                {...register("password", { required: true })}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
              
              <button
                type="button"
                className="text-(--color-primary-dark) hover:text-(--color-primary-light) underline-offset-2 hover:underline transition" >
                  Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 inline-flex items-center justify-center rounded-lg px-3.5 py-2.5 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed
                bg-(--color-primary) text-(--color-text-on-primary)
                hover:bg-(--color-accent-hover) hover:text-(--color-text-on-primary) `}>
                {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-(--color-text-muted)">
            <span>Don&apos;t have an account? </span>
            <Link
              to="/register"
              className="text-(--color-primary) hover:text-(--color-accent-hover) underline-offset-2 hover:underline transition"
            >
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] text-(--color-text-muted)">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </div>
  )
}

