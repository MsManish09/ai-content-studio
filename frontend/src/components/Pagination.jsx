

export default function Pagination({ page, totalPages, onPageChange }){


    // if(totalPages <= 1){
    //     return null
    // 

    return (
        <div className="flex items-center justify-center gap-2">

            {/* Prev Button */}
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={`px-3 py-1 rounded-md text-sm font-medium transition
                ${
                page === 1
                    ? "disabled-true bg-(--color-bg-secondary) text-(--color-text-muted)"
                    : "bg-(--color-bg-tertiary) text-(--color-text-primary) hover:bg-(--color-bg-quaternary)"
                }`} >
                    Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1 rounded-md text-sm font-medium transition
                        ${
                        p === page
                            ? "bg-(--color-primary) text-(--color-text-on-primary)"
                            : "bg-(--color-bg-tertiary) text-(--color-text-secondary) hover:bg-(--color-bg-quaternary) hover:text-(--color-text-primary)"
                        }`} >
                            {p}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button  onClick={() => onPageChange(page + 1)}  disabled={page === totalPages}  className={`px-3 py-1 rounded-md text-sm font-medium transition
                ${
                page === totalPages
                    ? "disabled-true bg-(--color-bg-secondary) text-(--color-text-muted)"
                    : "bg-(--color-bg-tertiary) text-(--color-text-primary) hover:bg-(--color-bg-quaternary)"
                }`}
            >
                Next
            </button>

        </div>
    )

}