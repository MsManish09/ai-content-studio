
import logo from '../../src/utils/ai-content-studio-logo.png'

import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { logoutThunk } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



export default function NavBar(){

    const dispatch = useDispatch()

    // logout functionality
    async function handleLogout(){
            
        // call logout thunk
        try {
            await dispatch(logoutThunk()).unwrap()
        } catch (error) {
            console.log('logout error: ', error)
        }
    }

    function handleProfileClick(){

    }

    return(
        <nav className=' flex border-b border-solid border-(--color-text-muted) justify-evenly items-center fixed-top' >
            {/* logo */}
            <div className=' w-[150px] h-[15vh] flex justify-center items-center' >
                <img src={logo} alt="" />
            </div>
            
            {/* profile and logout container */}
            <div className=' flex gap-[1.5rem]  ' >
                {/* profile */}
                <div>
                    <Link to='/profile'>
                        <IoPersonCircleSharp className=' w-[35px] h-[35px] text-(--color-accent) hover:text-(--color-accent-hover) hover:scale-110 ' />
                    </Link>
                </div>

                {/* logout */}
                <div onClick={handleLogout} >
                    <FaSignOutAlt className=' w-[35px] h-[35px] text-(--color-text-muted) hover:text-(--color-error) hover:scale-110 '/>
                </div>
            </div>
        </nav>
    )

}