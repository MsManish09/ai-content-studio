
import logo from '../../utils/ai-content-studio-logo.png'
import { useForm } from "react-hook-form"   

export default function Register(){

    // return (
    //     <div className="w-screen h-screen bg-(--color-primary) text-(--color-accent)">

    //         {/* logo */}
    //         <div className="w-full h-[15%] flex justify-center">
    //         <img
    //             src={logo}
    //             alt="site logo"
    //             className="h-[15vh] object-contain"
    //         />
    //         </div>

    //         {/* form */}
    //         <div className="w-full h-[80vh] flex justify-center items-center">

    //         <div className="p-3 border border-solid border-(--color-accent-hover) w-[350px] flex flex-col items-center gap-3 rounded-2xl shadow-[0_0_15px_#6B7A90]">

    //             {/* header */}
    //             <h2 className="text-[1.25rem] font-bold">
    //             Create Account
    //             </h2>

    //             {/* form */}
    //             <form
    //             // onSubmit={handleSubmit(onSubmit)}
    //             id="registerForm"
    //             className="w-full p-4"
    //             >

    //             {/* name */}
    //             <div className="w-full flex flex-col mb-2 gap-1">
    //                 <label htmlFor="registerFormName">
    //                 Full Name:
    //                 </label>

    //                 <input
    //                 type="text"
    //                 id="registerFormName"
    //                 required
    //                 className="bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none"
    //                 // {...register("name")}
    //                 />
    //             </div>

    //             {/* email */}
    //             <div className="w-full flex flex-col mb-2 gap-1">
    //                 <label htmlFor="registerFormEmail">
    //                 Email:
    //                 </label>

    //                 <input
    //                 type="email"
    //                 id="registerFormEmail"
    //                 required
    //                 className="bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none"
    //                 // {...register("email")}
    //                 />
    //             </div>

    //             {/* password */}
    //             <div className="w-full flex flex-col mb-2 gap-1">
    //                 <label htmlFor="registerFormPassword">
    //                 Password:
    //                 </label>

    //                 <input
    //                 type="password"
    //                 id="registerFormPassword"
    //                 required
    //                 className="bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none"
    //                 // {...register("password")}
    //                 />
    //             </div>

    //             {/* confirm password */}
    //             <div className="w-full flex flex-col mb-2 gap-1">
    //                 <label htmlFor="registerFormConfirmPassword">
    //                 Confirm Password:
    //                 </label>

    //                 <input
    //                 type="password"
    //                 id="registerFormConfirmPassword"
    //                 required
    //                 className="bg-(--color-bg-tertiary) rounded-[5px] p-1 text-(--color-primary-dark) border-2 border-solid border-(--color-primary-light) focus:border-(--color-accent-hover) outline-none"
    //                 // {...register("confirmPassword")}
    //                 />
    //             </div>

    //             {/* error */}
    //             {error && (
    //                 <div className="text-red-500 text-sm mb-2 text-center">
    //                 {error}
    //                 </div>
    //             )}

    //             {/* register button */}
    //             <button
    //                 type="submit"
    //                 disabled={loading}
    //                 className="w-full m-auto bg-(--color-accent) hover:bg-(--color-accent-hover) p-2 text-(--color-primary-dark) font-bold rounded-[10px] hover:scale-95 mt-2"
    //             >
    //                 {loading ? "Creating account..." : "Register"}
    //             </button>

    //             </form>

    //             {/* footer */}
    //             <div className="border-t border-solid border-(--color-accent) w-full p-4 flex justify-center">

    //             <p className="text-(--color-accent-soft)">
    //                 Already have an account?{" "}
    //                 <span className="text-(--color-accent) hover:text-(--color-accent-hover) hover:cursor-pointer">
    //                 Login
    //                 </span>
    //             </p>

    //             </div>

    //         </div>
    //         </div>

    //     </div>
    // )
    return(
        <div className=" w-screen h-screen bg-(--color-primary) text-(--color-accent) flex justify-center items-center " >
            <h1 className=' font-bold text-[2.5rem] ' >Register page</h1>
        </div>
    )
}