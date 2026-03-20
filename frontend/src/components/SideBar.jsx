
import logo from '../../src/utils/fevicon.png'
import { BsChatLeftText } from "react-icons/bs";
import HistoryPills from './HistoryPills';
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Sidebar({isOpen, setIsOpen}){

    const {recentGenerations, isLoadingHistory, generations} = useSelector((state)=> state.generation)
    const navigate = useNavigate()


    // navigate to historypage 1
    function openHistoryPage(){

        // 0.3 sec delay
        setTimeout(() => {
            navigate('/history?page=1')
        }, 300);

    }

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
                
                {/* main */}
                {/* generated content pills */}
                <div className='  max-w-full  max-h-[80vh] overflow-y-auto bg-(--color-primary-lighter) flex flex-col custom-scrollbar p-2 text-gray-200 text-[1rem] ' >

                    {/* loading history */}
                    {
                        isLoadingHistory && (
                            <p className="text-center">
                                Loading history...
                            </p>
                        )
                    }

                    {/* generated pills */}
                    {   recentGenerations.length === 0 ? (
                            <p className="text-center text-gray-400 py-4">
                                No generations yet. Start generating ✨
                            </p>

                        ) : (                                
                                recentGenerations.map((item, index)=>{
                                    return <HistoryPills 
                                    key={item._id}
                                    index={index + 1}
                                    data={item}  />
                                })
                            )
                    }

                </div>

                {/* footer -> history page */}
                <div className=' m-auto rounded bg-(--color-primary-light) text-(--color-accent) w-[90%] p-2 flex justify-center items-center font-semibold border border-solid border-(--color-accent) hover:bg-(--color-primary) hover:text-(--color-accent-hover) hover:cursor-pointer hover:scale-105 ' onClick={()=> openHistoryPage() } >
                    All Generations
                </div>

            </div>

        </aside>

    )

}