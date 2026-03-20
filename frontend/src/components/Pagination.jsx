

export default function Pagination({ page, totalPages, onPageChange }){


    // if(totalPages <= 1){
    //     return null
    // }



    return(

        <div className="flex gap-2 mt-6">

            {/*  previous btn */}
            <button className={` px-3 py-1 rounded bg-(--color-accent) hover:bg-(--color-accent-hover) hover:cursor-pointer hover:scale-105 disabled-${ page === 1} `  } disabled={page===1} onClick={()=>onPageChange(page-1)}>
                Prev
            </button>

            {[...Array(totalPages)].map((_,index)=>{

                const pageNumber = index + 1
                return(  

                    <button key={pageNumber} onClick={()=>onPageChange(pageNumber)}
                        className={`px-3 py-1 rounded ${page === pageNumber ? "bg-blue-600 text-white": "bg-gray-200"} hover:cursor-pointer hover:scale-105` } >
                        {pageNumber}
                    </button>

                )

            })}

            {/* next btn */}
            <button className={` px-3 py-1 rounded bg-(--color-accent) hover:scale-105 hover:bg-(--color-accent-hover) hover:cursor-pointer disabled-${page===totalPages} ` } disabled={page===totalPages} onClick={()=>onPageChange(page+1)}>
                Next
            </button>

        </div>
 )

}