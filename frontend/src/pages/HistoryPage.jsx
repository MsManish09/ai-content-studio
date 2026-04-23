import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/NavBar'
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { deleteIndividualHistoryThunk, historyThunk } from '../redux/generationSlice';
import Pagination from '../components/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';


export default function HistoryPage(){

    const generationState = useSelector(state => state.generation)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // extact page number from the url
    const [searchParams] = useSearchParams()
    let page = Number(searchParams.get("page")) || 1

    // re-load generationState on history page navigation -> latest 20 generations
    useEffect(()=>{

        if(page < 1){
            navigate('/history?page=1')
            return
        }

        // if page > totalpages
        if( page > generationState.generations.totalPages ){

            navigate(`/history?page=${generationState.generations.totalPages}`)
            return
            
        }

        dispatch(historyThunk(page))
    },[page])

    // smooth page scroll reset
    useEffect(()=>{
        window.scrollTo({ top:0, behavior:'smooth' })
    },[generationState.generations.page])

    // pagination -> page change
    function handlePageChange(page){
        navigate(`/history?page=${page}`)
        // dispatch(historyThunk(page))
    }


    return (
        <div className="bg-(--color-bg-primary) w-full min-h-screen relative">

            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <div className="p-4 my-4 text-(--color-text-primary) h-[80vh] overflow-y-auto custom-scrollbar">

            {/* Heading */}
            <h2 className="px-2 font-bold text-[1.75rem] text-center sm:text-start text-(--color-primary)">
                Content Generation History
            </h2>

            {/* Cards */}
            <div className="flex flex-col gap-3 py-4 px-2">

                {generationState.isLoadingHistory && (
                <p className="text-(--color-text-muted)">Loading...</p>
                )}

                {generationState.generations?.data?.map((item, index) => (
                <HistoryCards
                    key={item._id}
                    item={item}
                    index={index + 1}
                    page={generationState.generations.page}
                />
                ))}

            </div>
            </div>

            {/* Pagination */}
            <div className="px-6 absolute bottom-4 bg-(--color-bg-primary) w-full">
            <Pagination
                page={generationState.generations.page}
                totalPages={generationState.generations.totalPages}
                onPageChange={handlePageChange}
            />
            </div>

        </div>
    )

}

function HistoryCards({item, index, page}){

    const date = new Date(item.createdAt);
    const formatedDate = formatSmartDate( date )
    const [err, setErr ] = useState(null)
    const dispatch = useDispatch()


    // functionality to delete generation
    async function handleDeletion(){

        console.log('delete : ', item._id)
        console.log('page: ', page)

        try {
            const res = await dispatch( deleteIndividualHistoryThunk({
                id: item._id,
                page
            }) ).unwrap()
            console.log(' delete history | res : ', res)
           
           toast.success('Deletion successful')

        } catch (error) {
            console.log(' delete history error | error : ', error)

            setErr(error)
            toast.error(error)
        }

    }

    return (
        <div className="flex items-center gap-3 w-full  bg-(--color-bg-tertiary)  hover:bg-(--color-bg-quaternary)  transition  p-3 rounded-lg  border border-(--color-border) hover:border-(--color-border-strong) hover:translate-y-[2px] ">

            {err && (
                <div className="text-(--color-error) text-sm">{err?.message}</div>
            )}

            {/* Index */}
            <p className="flex items-center justify-center font-medium  w-8 h-8 rounded-full  bg-(--color-accent-soft)  text-(--color-text-primary)">
                {index}
            </p>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2">

            {/* Prompt */}
            <p className="flex-1 text-sm font-medium truncate text-(--color-text-primary)">
                {item.prompt}
            </p>

            {/* Right section */}
                <div className="flex items-center gap-2 text-xs">

                    {/* Template */}
                    <span className="flex items-center justify-center  text-sm font-mono font-semibold  px-3 py-1 rounded-md  bg-(--color-accent-soft)  text-(--color-primary)">
                        {item.template}
                    </span>

                    {/* Date */}
                    <span className="flex items-center justify-center  text-xs font-mono  px-3 py-1 rounded-md  bg-(--color-bg-secondary)  text-(--color-text-secondary)  whitespace-nowrap">
                        {formatedDate}
                    </span>

                </div>
            </div>

            {/* Delete */}
            <button className="p-2  text-(--color-text-muted)  hover:text-(--color-error)  hover:scale-110  rounded-md transition text-[1.5rem]" onClick={handleDeletion} >
                <MdDelete />
            </button>

        </div>
    )
}

// date formator
function formatSmartDate(dateString){

    const date = new Date( dateString )
    const now = new Date()

    const diffsMonths = now - date
    const diffsDays =  Math.floor( diffsMonths / ( 1000 * 60 * 60 * 24 ) )

    if(diffsDays === 0){
        const hours = Math.floor(diffsMonths / ( 1000 *60 * 60 ))

        // if generated less than an 1hour ago
        if( hours === 0 ){
            return 'Just Now'
        }

        // moer than 1 hour ago
        return `${hours} hours ago`
    }

    // if generated less than 30 days ago
    if (diffsDays < 30){
        return `${diffsDays} days ago`
    }

    // if generated more than 30 days ago -> actual date
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

}