
import { MdDeleteForever } from "react-icons/md";
import { deleteIndividualHistoryThunk } from "../redux/generationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default function HistoryPills({index, data}){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [err, setError] = useState(null)
    const generationState = useSelector( state => state.generation)

    // individual history pill click 
    function handleClick(){
        // console.log('History pill | genertion id: ', data._id)
        navigate(`/generation/${data._id}`)

    }

    // history delete functionality
    async function handleDelete(){
        // console.log(data._id, ' will be deleted...')

        try {
           const res =  await dispatch( deleteIndividualHistoryThunk({id: data._id,
                page: generationState.generations.page}) ).unwrap()
            //    console.log( 'delete history pill response: ', res )
           toast.success('Deletion successful')

            //after deletion navigate to dashboard
           navigate('/')

        } catch (error) {
            // console.log('error deleting history: ', error)
            setError(error)
            toast.error(error)
        }

    }

    return(

        <div onClick={handleClick} className="group flex items-center justify-between gap-2 px-3 py-2.5 mb-2 rounded-xl cursor-pointer border border-(--color-border) bg-(--color-bg-quaternary) hover:bg-(--color-bg-tertiary) hover:border-(--color-border-strong) transition-all duration-200" >

            <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-bg-tertiary) text-[10px] text-(--color-text-muted)">
                    {index + 1}
                </span>

                <p className="truncate text-xs font-medium text-(--color-text-secondary) group-hover:text-(--color-text-primary) transition-colors duration-200">
                    {data?.prompt || "Untitled generation"}
                </p>
            </div>

            <button onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                }}
                className="shrink-0 rounded-lg p-1.5 text-(--color-text-muted) hover:bg-(--color-bg-secondary) hover:text-(--color-error) transition-all duration-200" title="Delete history" >
                <MdDeleteForever className="w-4 h-4" />
            </button>
        </div>
    )
}