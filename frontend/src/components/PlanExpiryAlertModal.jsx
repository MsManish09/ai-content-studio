
import { XCircle, AlertTriangle } from "lucide-react"
import { useEffect } from "react"

export default function PlanExpiryModal({  onClose, daysRemaining }) {

    const isCritical = daysRemaining <= 7

    useEffect(()=>{
        
    }, [])

    function handleClose(){

        // set reminder shown to true in session storage
        sessionStorage.setItem('planExpiryReminderShown', true)

        // call setmodal fn
        onClose()
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className={` relative w-full max-w-md rounded-xl border p-6 shadow-xl
                  ${ isCritical ? "border-red-300 bg-red-50" : "border-yellow-300 bg-yellow-50" } `} >


                {/* Close Button */}
                <button onClick={handleClose} className=" absolute right-4 top-4 text-gray-500 hover:text-gray-700 " >
                    <XCircle size={22} />
                </button>

                {/* Alert Icon */}
                <div className="mb-4 flex justify-center">
                    <AlertTriangle  size={50}  className={ isCritical ? "text-red-600" : "text-yellow-600" } />
                </div>

                {/* Title */}
                <h2 className={` text-center text-xl font-bold  ${ isCritical  ? "text-red-700"  : "text-yellow-700" } `} >
                    {isCritical ? "Pro Plan Expiring Soon!" : "Pro Plan Expiration Reminder"}
                </h2>

                {/* Body */}
                <p className="mt-3 text-center text-gray-700">
                    Your Pro subscription expires in
                    <span className="mx-1 font-bold">
                        {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}
                    </span>.
                </p>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Renew your subscription to continue enjoying
                    unlimited content generation and premium features.
                </p>

                {/* Footer: CTA-> renewal */}
                <button  onClick={handleClose}  className={` mt-6 w-full rounded-lg px-4 py-2 font-medium text-white transition ${  isCritical  ? "bg-red-600 hover:bg-red-700"  : "bg-yellow-600 hover:bg-yellow-700" } `} >
                    Got It
                </button>

            </div>

        </div>
    )
}