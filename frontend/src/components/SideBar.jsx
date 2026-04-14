
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

        <aside className={` fixed md:static top-0 left-0 z-50 h-screen w-[280px] bg-(--color-bg-secondary) border-r border-(--color-border) text-(--color-text-primary) transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex h-full flex-col">
                    
                    {/* top section */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-(--color-border) ">
                        <div className="flex items-center gap-3">

                            <div className="h-10 w-10 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) flex items-center justify-center">
                                <img src={logo} alt="logo" className="h-5 w-5 object-contain opacity-90" />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm font-semibold tracking-tight text-(--color-text-primary)">
                                    AI Content Studio
                                </p>

                                <p className="text-[11px] text-(--color-text-muted)">
                                    Content workspace
                                </p>
                            </div>
                        </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 rounded-lg text-(--color-text-muted) hover:text-(--color-text-primary) hover:bg-(--color-bg-tertiary) transition"
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                    </div>

                    {/* history header */}
                    <div className="px-4 pt-5 pb-3">
                        <button
                            onClick={openHistoryPage}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) text-(--color-text-secondary) hover:text-(--color-text-primary) hover:border-(--color-border-strong) transition"
                        >
                            <BsChatLeftText className="w-4 h-4" />
                            <span className="text-sm font-medium">History</span>
                        </button>
                    </div>

                    {/* recent history list */}
                    <div className="flex-1 overflow-hidden px-3 pb-4">
                        <div className="h-full rounded-2xl bg-(--color-bg-tertiary) border border-(--color-border) overflow-hidden">
                            <div className="px-4 py-3 border-b border-(--color-border)">
                                <p className="text-xs uppercase tracking-[0.18em] text-(--color-text-muted)">
                                    Recent generations
                                </p>
                            </div>

                            <div className="h-full overflow-y-auto custom-scrollbar px-2 py-2">
                            {isLoadingHistory ? (
                                <div className="space-y-2 px-1">
                                {[...Array(6)].map((_, index) => (
                                    <div
                                    key={index}
                                    className="h-11 rounded-xl bg-(--color-bg-quaternary) animate-pulse"
                                    />
                                ))}
                                </div>

                            ) : recentGenerations?.length > 0 ? (
                                recentGenerations.map((data, index) => (
                                <HistoryPills key={data._id} data={data} index={index} />
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-40 px-4 text-center">
                                <p className="text-sm text-(--color-text-muted)">
                                    No recent generations yet.
                                </p>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
            </div>
        </aside>

    )

}