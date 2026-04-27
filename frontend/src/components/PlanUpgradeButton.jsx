import { Link } from "react-router-dom";
import { IoDiamondSharp } from "react-icons/io5";


export default function PlanUpgradeButton(){


    return(
        <Link to="/upgrade" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-(--color-accent-soft) text-(--color-text-primary) border border-(--color-border) hover:bg-(--color-accent) hover:text-(--color-text-on-primary) hover:border-(--color-primary-light) transition-all duration-200 ease-in-out cursor-pointer subtle-zoom " >
            <span>Pro</span>
            <IoDiamondSharp />
        </Link>
    )

}