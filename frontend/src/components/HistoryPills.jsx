
export default function HistoryPills({index, data}){
    // console.log('l:', {num})

    // individual history pill click 
    function handleClick(){
        console.log('History pill | genertion id: ', data._id)
    }

    return(
        <div className="w-full flex items-center h-[48px] px-4 rounded-lg  hover:bg-(--color-primary-light)  transition-all duration-200  cursor-pointer truncate hover:scale-[1.02] text-[1.05rem" onClick={()=>{handleClick()}}>

        <span className="font-medium mr-2">{index}:</span>
        <span className="truncate">{data.prompt} </span>

        </div>
    )
}