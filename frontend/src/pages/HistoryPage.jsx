import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/NavBar'
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { deleteIndividualHistoryThunk } from '../redux/generationSlice';


export default function HistoryPage(){

    const generationState = useSelector(state => state.generation)

    // re-load generation on history page navigation
    useEffect(()=>{
        dispatch(historyThunk(1))
    },[])

    return(
        <div className=' bg-(--color-primary) w-full h-screen ' >
            
            {/* header -> nav bar */}
            <Navbar />

            {/* main  */}
            <div className=' p-4 my-[1rem]  text-(--color-text-on-primary) ' >

                {/* heading */}
                <h2 className='px-2 font-bold text-[1.75rem] text-center sm:text-start ' > Content Generation History</h2>

                {/* history cards */}
                <div className=' flex flex-col gap-3 py-4 px-2 ' >
                    
                    {/* loading element */}
                    {
                        generationState.isLoadingHistory && (
                            <p>Loading... </p>
                        )
                    }

                    {/* render history cards */}
                    {
                        generationState.generations.data.map((item, index)=> <HistoryCards item={item} index={index + 1} page={generationState.generations.page} />)
                    }

                </div>

            </div>

            {/* footer -> pagination */}


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

    return(
        <div className='flex items-center gap-3 w-full bg-(--color-primary-lighter) hover:bg-(--color-primary-light) transition p-3 rounded-lg border border-gray-200 hover:translate-0.5'>

            { err && (
                <div>{err?.message}</div>
            ) }

            {/* index */}
            <p className=' flex items-center justify-center font-medium  w-8 h-8 rounded-[50%] bg-(--color-primary-light) '> {index} </p>

            {/* details */}
            <div className='flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2'>

                {/* prompt */}
                <p className='flex-1 text-sm font-medium truncate'>
                    {item.prompt}
                </p>

                {/* right section */}
                <div className='flex items-center gap-2 text-xs'>

                    {/* template */}
                    <span className=' w-30 flex items-center sm:h-8 justify-center text-[1rem] font-mono font-bold h-6 px-3 py-1 bg-(--color-accent-hover) rounded-md '>
                        {item.template}
                    </span>

                    {/* date */}
                    <span className='w-30 h-6 sm:h-8 flex items-center justify-center text-xs text-gray-600 bg-gray-100 rounded-md whitespace-nowrap font-mono'>
                        {formatedDate}
                    </span>

                </div>

            </div>

            {/* delete */}
            <button className='p-2 text-gray-400 hover:text-(--color-error) hover:scale-110 hover:cursor-pointer rounded-md transition text-[1.5rem] ' onClick={handleDeletion}>
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
    return date.toLocaleDateString('en-US'), {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }

}