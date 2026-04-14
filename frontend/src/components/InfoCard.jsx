
export default function InfoCard({title,value}){
    return(

        <div className="rounded-xl border border-(--color-border) bg-(--color-bg-tertiary) px-4 py-3 text-sm text-(--color-text-secondary) ">

            <p className="font-medium text-(--color-text-primary) " >
                {title}
            </p>

            <p className="mt-1 text-(--color-text-muted) ">
                {value}
            </p>
        </div>
    )
}