
import { MdDeleteForever } from "react-icons/md";
import { deleteIndividualHistoryThunk } from "../redux/generationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";



export default function HistoryPills({index, data}){

    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    // individual history pill click 
    function handleClick(){
        console.log('History pill | genertion id: ', data._id)
    }

    // history delete functionality
    async function handleDelete(){
        // console.log(data._id, ' will be deleted...')

        try {
           const res =  await dispatch( deleteIndividualHistoryThunk(data._id) ).unwrap()
           console.log( 'delete history pill response: ', res )
        } catch (error) {
            console.log('error deleting history: ', error)
            setError(error)
        }

    }

    return(
        <div className=" flex gap-2 justify-center items-center hover:bg-(--color-primary-light) hover:scale-[1.02] rounded-lg cursor-pointer  transition-all duration-200  " >

            { error && (
                <div>error?.message</div>
            ) }

            <div className="w-full flex justify-between items-center h-[48px] px-4 truncate  text-[1.05rem" onClick={()=>{handleClick()}}>

                <span className="truncate">{data.prompt} </span>

            </div>

            <MdDeleteForever onClick={handleDelete} className=" h-[1.2rem] w-[1.2rem] hover:text-(--color-error) hover:scale-105 mr-2 " />

        </div>
    )
}