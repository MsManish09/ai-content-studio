import logo from '../../src/utils/ai-content-studio-logo.png'
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { logoutThunk } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {clearGenerationState} from '/src/redux/generationSlice.js'
import { RxHamburgerMenu } from 'react-icons/rx';
import toast from 'react-hot-toast';
import PlanUpgradeButton from './PlanUpgradeButton';

export default function NavBar({setIsSidebarOpen}){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const plan = useSelector((state) => state.auth?.user?.plan);

    // funciton to logout
    async function handleLogout(){
            
        try {

            await dispatch(logoutThunk()).unwrap()
            // empty generation state
            dispatch(clearGenerationState())
            toast.success('Logged Out successfully.')

        } catch (error) {

            const message = error?.message || 'failed to logout!'
            // console.log('logout error: ', error)
            toast.error(message)
        }
    }

    // nvigate to home page on logo click
    function handleLogoClick(){
        navigate('/')
    }

    return(

        <header className="sticky top-0 z-40 w-full border-b border-(--color-border) bg-(--color-bg-primary)/90 backdrop-blur-md">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

                {/* Left: menu + logo */}
                <div className="flex items-center gap-3">

                    {/* Hamburger (mobile only ) */}
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(true)}
                        className="inline-flex md:hidden items-center justify-center rounded-md p-1.5 text-(--color-text-muted) hover:text-(--color-primary-light) hover:bg-(--color-bg-secondary) hover:scale-105 transition"
                        aria-label="Open navigation">
                        <RxHamburgerMenu className="h-5 w-5" />
                    </button>

                    {/* Logo + name */}
                    <button
                        type="button"
                        onClick={handleLogoClick}
                        className="flex items-center gap-2 group hover:scale-105 hover:cursor-pointer " >

                        <img src={logo} alt="AI Content Studio"
                        className="h-7 w-auto opacity-90 group-hover:opacity-100 transition"/>

                        <span className="hidden sm:inline text-sm font-medium tracking-tight text-(--color-text-primary) ">
                        AI Content Studio
                        </span>

                    </button>
                </div>

                {/* Center: subtle indicator */}
                <div className="hidden md:flex items-center gap-2 text-xs text-(--color-text-muted)">

                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-success) animate-pulse" />
                    <span>Workspace ready</span>
                </div>

                {/* pro upgrade button - visible only for free users */}
                {plan && plan.toLowerCase() === "free" && (
                    <PlanUpgradeButton />
                )}

                {/* Right: chat, profile, logout */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        to="/history"
                        className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-(--color-border)] bg-(--color-bg-secondary) px-3 py-1.5 text-xs text-(--color-text-secondary) hover:border-(--color-accent) hover:bg-(--color-accent-soft) hover:scale-105 transition" >
                        <MdOutlineChat className="h-3.5 w-3.5" />
                        <span>History</span>
                    </Link>

                    <Link
                        to="/profile"
                        className="inline-flex items-center gap-1.5 rounded-full border border(--color-border) bg-(--color-bg-secondary) px-2.5 py-1 text-xs text-(--color-text-secondary) hover:border-(--color-accent) hover:bg-(--color-accent-soft) hover:scale-105 transition">
                        <IoPersonCircleSharp className="h-4 w-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>

                    <button type="button" onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-full bg-(--color-bg-tertiary) text-(--color-text-secondary) hover:text-(--color-primary-light) hover:bg-(--color-bg-quaternary) hover:scale-105 hover:cursor-pointer p-2 text-xs transition">
                        <FaSignOutAlt className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </header>


    )

}