
export default function InfoCard({title,value}){
    return(

        <div className="bg-(--color-primary-lighter) p-4 rounded-lg border">
            <p className="text-xs text-gray-400">
                {title}
            </p>
            <p className="font-semibold text-(--color-text-on-primary)">
                {value}
            </p>
        </div>
    )
}