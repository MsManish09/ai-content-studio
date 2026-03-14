import logo from '../../src/utils/ai-content-studio-logo.png'

import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";

import { logoutThunk } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {clearGenerationState} from '/src/redux/generationSlice.js'

export default function NavBar({setIsSidebarOpen}){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // funciton to logout
    async function handleLogout(){
            
        try {

            await dispatch(logoutThunk()).unwrap()
            dispatch(clearGenerationState())

        } catch (error) {

            console.log('logout error: ', error)

        }
    }

    function handleClick(){

        navigate('/')

    }

    return(

        <nav className='  flex border-b border-(--color-text-muted) justify-evenly items-center px-6 h-[70px] bg-(--color-primary) '>

            {/* LEFT SECTION */}
            <div className='flex items-center gap-4'>

                 {/* Hamburger (mobile only) */}

                <MdOutlineChat
                    onClick={()=>setIsSidebarOpen(true)}
                    className="w-[28px] h-[28px] text-(--color-text-muted) cursor-pointer md:hidden"
                />

                {/* Logo */}

                <div onClick={handleClick}
                className=' w-[140px] hover:scale-105 cursor-pointer transition '>

                    <img src={logo} alt="logo"/>

                </div>

            </div>
            

            {/* RIGHT SECTION */}

            <div className='flex gap-6 items-center'>

                {/* profile */}

                <Link to='/profile'>

                    <IoPersonCircleSharp
                    className=' w-[32px] h-[32px] text-(--color-text-muted) hover:text-(--color-accent-hover) hover:scale-110 transition '
                    />

                </Link>

                {/* logout */}

                <FaSignOutAlt onClick={handleLogout} className=' w-[28px] h-[28px] text-(--color-text-muted) hover:text-(--color-error) hover:scale-110 cursor-pointer transition ' />

            </div>

        </nav>

    )

}