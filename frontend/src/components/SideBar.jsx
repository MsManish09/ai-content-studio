
import logo from '../../src/utils/fevicon.png'
import { BsChatLeftText } from "react-icons/bs";
import HistoryPills from './HistoryPills';
import { HiX } from "react-icons/hi";

export default function Sidebar({isOpen, setIsOpen}){

    const loop = [1, 2 ,3, 4 ,5 ,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    return(

        <aside className={` fixed md:static w-[250px] min-h-screen bg-(--color-primary-lighter) flex flex-col items-center z-50 transform transition-transform duration-500  ${isOpen ? "translate-x-0" : "-translate-x-full"}  md:translate-x-0 `} >

        {/* logo */}
            <div className=' w-full flex border-b border-(--color-text-muted) justify-evenly items-center px-6 h-[70px] ' > 
                
                <img src={logo} alt="site logo"  className=' w-[70px] h-[70px]' />

                {/* Close button mobile */}
                <HiX
                    onClick={()=>setIsOpen(false)}
                    className="w-[28px] h-[28px] cursor-pointer md:hidden"
                />

            </div>


        {/* main -> history */}

            <div className=' w-full h-full ' >

                {/* headline */}
                <div className=' w-full flex justify-start items-center  gap-2 font-bold text-[1.25rem] text-(--color-primary-dark) p-3 ' >
                    <h2 > Your Chats </h2>
                    <BsChatLeftText /> 
                </div>
                
                {/* generated content pills */}
                <div className='  max-w-full  max-h-[80vh] overflow-y-auto bg-(--color-primary-lighter) flex flex-col custom-scrollbar p-2 text-gray-200 text-[1rem] ' >

                    {/* generated pills */}
                    {
                        loop.map((num)=>{
                            return <HistoryPills num={num} />
                        })
                    }

                </div>

            </div>

        </aside>

    )

}