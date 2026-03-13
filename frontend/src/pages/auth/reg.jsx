
import { useForm } from "react-hook-form"
import logo from '../../utils/ai-content-studio-logo.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function reg(){

  const {register, handleSubmit, watch}  = useForm()
  const navigate = useNavigate()

  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const password = watch("password")

  function onSubmit(data){

    if(data.password !== data.confirmPassword){
      setError("Passwords do not match")
      return
    }

    setError(null)

    console.log("Register data:", data)

    navigate("/login")
  }

  return (
    <div className="w-screen h-screen bg-(--color-primary) text-(--color-accent)">

      {/* logo */}
      <div className="w-full h-[15%] flex justify-center">
        <img 
          src={logo} 
          alt="site logo"
          className="h-[15vh] object-contain"
        />
      </div>

      {/* container */}
      <div className="w-full h-[80vh] flex justify-center items-center">

        <div className="p-6 border border-(--color-accent-hover)
        w-[400px] flex flex-col items-center gap-2
        rounded-2xl shadow-[0_0_25px_#6B7A90]
        bg-(--color-primary)
        transition duration-300">

          {/* header */}
          <h2 className="text-[1.5rem] font-bold">
            Create Account
          </h2>

          <p className="text-sm text-(--color-accent-soft) mb-2">
            Start creating AI content today
          </p>

          {/* form */}
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="w-full flex flex-col gap-3"
          >

            {/* reusable input style */}
            {/* name */}
            <div className="flex flex-col gap-1 group">

              <label className="text-sm">
                Name
              </label>

              <input
                type="text"
                required

                className="
                bg-(--color-bg-tertiary)
                rounded-md p-2
                text-(--color-primary-dark)

                border-2 border-(--color-primary-light)

                focus:border-(--color-accent)
                focus:shadow-[0_0_8px_#FFD54F]

                outline-none

                transition duration-300
                "

                {...register("name")}
              />

            </div>

            {/* email */}
            <div className="flex flex-col gap-1">

              <label className="text-sm">
                Email
              </label>

              <input
                type="email"
                required

                className="
                bg-(--color-bg-tertiary)
                rounded-md p-2
                text-(--color-primary-dark)

                border-2 border-(--color-primary-light)

                focus:border-(--color-accent)
                focus:shadow-[0_0_8px_#FFD54F]

                outline-none

                transition duration-300
                "

                {...register("email")}
              />

            </div>

            {/* password */}
            <div className="flex flex-col gap-1">

              <label className="text-sm">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  required

                  className="
                  w-full
                  bg-(--color-bg-tertiary)
                  rounded-md p-2

                  text-(--color-primary-dark)

                  border-2 border-(--color-primary-light)

                  focus:border-(--color-accent)
                  focus:shadow-[0_0_8px_#FFD54F]

                  outline-none
                  transition duration-300
                  "

                  {...register("password")}
                />

                {/* toggle */}
                <span

                  onClick={()=>setShowPassword(!showPassword)}

                  className="
                  absolute right-3 top-2
                  cursor-pointer
                  text-(--color-primary)
                  hover:text-(--color-accent-hover)
                  select-none
                  "

                >
                  {showPassword ? "🙈" : "👁️"}
                </span>

              </div>

            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-1">

              <label className="text-sm">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  required

                  className="
                  w-full
                  bg-(--color-bg-tertiary)
                  rounded-md p-2

                  text-(--color-primary-dark)

                  border-2 border-(--color-primary-light)

                  focus:border-(--color-accent)
                  focus:shadow-[0_0_8px_#FFD54F]

                  outline-none
                  transition duration-300
                  "

                  {...register("confirmPassword")}
                />

                <span

                  onClick={()=>setShowConfirm(!showConfirm)}

                  className="
                  absolute right-3 top-2
                  cursor-pointer
                  text-(--color-primary)
                  hover:text-(--color-accent-hover)
                  select-none
                  "

                >
                  {showConfirm ? "🙈" : "👁️"}
                </span>

              </div>

            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* button */}
            <button

              type="submit"

              className="
              w-full

              bg-(--color-accent)
              hover:bg-(--color-accent-hover)

              p-2 mt-2

              text-(--color-primary-dark)
              font-bold

              rounded-lg

              transition duration-200
              hover:scale-95
              hover:shadow-[0_0_10px_#FFD54F]
              "

            >
              Create Account

            </button>

          </form>

          {/* footer */}
          <div className="border-t border-(--color-accent)
          w-full p-3 flex justify-center mt-2">

            <p className="text-(--color-accent-soft)">
              Already have an account?{" "}

              <Link to="/login">

                <span className="
                text-(--color-accent)
                hover:text-(--color-accent-hover)
                cursor-pointer
                font-semibold
                transition
                ">

                  Login

                </span>

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}