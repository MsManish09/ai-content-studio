
export default function HistoryPills({num}){
    console.log('l:', {num})

    return(
        <div className="w-full flex items-center h-[48px] px-4 rounded-lg  hover:bg-(--color-primary-light)  transition-all duration-200  cursor-pointer truncate hover:scale-[1.02] text-[1.05rem">

        <span className="font-medium mr-2">{num}:</span>
        <span className="truncate">Lorem, ipsum dolor sit amet consectetur . </span>

        </div>
    )
}