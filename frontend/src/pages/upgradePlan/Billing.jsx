import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { upgradePlanThunk } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


export default function Billing() {
  const [loading, setLoading] = useState(false)
  const [showModal, setModal] = useState(false)
  const [generatedOTP, setGeneratedOTP] = useState("")
  const [enteredOTP, setEnteredOTP] = useState("")
  const [OTPError, setOTPError]= useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

  // function to validate OTP and call upgrade api
  async function verifyOTP(){

    if(enteredOTP !== generatedOTP){
      setOTPError("Invalid OTP")
      return
    }

    try{
      
      await dispatch(
          upgradePlanThunk()
        ).unwrap()

        // if plan upgrade successful -> toast success message
        toast.success("Plan upgraded")
        setModal(false)

        // after succesful upgradation ->  redirect to home page
        navigate("/")

    }
    
    // if upgrade api fails -> toasts error message
    catch(error){
        toast.error(error)
    }

  

  }

  // functin to generate random 4 digit opt
  function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  // function to handle payment
  function handlePayment(e){
    e.preventDefault()

    setLoading(true)

    // simulate API call -> 2 sec delay
    setTimeout(() => {
    
     //generate and set otp
      const otp = generateOTP()
      setGeneratedOTP(otp)
      setEnteredOTP("")
      setOTPError("")

      // open modal
      setModal(true)
      
      // plan upgrade success message
      toast.success(`Demo OTP: ${otp}`, {
        duration: 6000
      })


      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen px-6 py-16 bg-(--color-bg-primary) text-(--color-text-primary)">

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-semibold mb-3">
          Complete your upgrade
        </h1>
        <p className="text-(--color-text-secondary) ">
          You're one step away from unlimited content generation.
        </p>
      </div>

      {/* Payment Card */}
      <form
        onSubmit={handlePayment}
        className="max-w-2xl mx-auto bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl p-8 space-y-6"
      >

        {/* Plan Summary */}
        <div className="flex justify-between items-center border-b border-(--color-border) pb-4">
          <div>
            <h2 className="text-lg font-medium">Pro Plan</h2>
            <p className="text-sm text-(--color-text-muted) ">
              Billed monthly
            </p>
          </div>
          <p className="text-xl font-semibold">₹499</p>
        </div>

        {/* Card Number */}
        <div>
          <label className="text-sm text-(--color-text-secondary) ">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) focus:outline-none focus:border-(--color-border-strong) "
            required
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-(--color-text-secondary) ">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) focus:outline-none focus:border-(--color-border-strong) "
              required
            />
          </div>

          <div>
            <label className="text-sm text-(--color-text-secondary) ">
              CVV
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) focus:outline-none focus:border-(--color-border-strong) "
              required
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm text-(--color-text-secondary) ">
            Name on Card
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) focus:outline-none focus:border-(--color-border-strong) "
            required
          />
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-(--color-primary) text-(--color-text-on-primary) font-medium subtle-zoom" >
          {loading ? "Processing..." : "Pay ₹499 →"}
        </button>

        {/* Trust Text */}
        <p className="text-xs text-center text-(--color-text-muted)">
          This is a demo payment. No real charges will be made.
        </p>

        {/* payment confimratin modal */}
        {
          showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              <div className="bg-(--color-bg-secondary) p-6 rounded-2xl w-full max-w-md border border-(--color-border)">

                <h2 className="text-xl font-semibold mb-2">
                  Confirm Payment
                </h2>

                <p className="text-sm text-(--color-text-secondary) mb-6">
                  Enter the 4-digit OTP sent for payment confirmation.
                </p>

                <input
                  type="text"
                  maxLength={4}
                  value={enteredOTP}
                  onChange={(e) => setEnteredOTP(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) focus:outline-none"
                />

                {
                  OTPError && (
                    <p className="text-red-500 text-sm mt-2">
                      {OTPError}
                    </p>
                  )
                }

                <div className="flex gap-3 mt-6">

                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="flex-1 py-3 rounded-xl border border-(--color-border)"
                  >
                    Cancel
                  </button>

                  <button type="button" onClick={verifyOTP} className="flex-1 py-3 rounded-xl bg-(--color-primary) text-black" >
                    Confirm
                  </button>

                </div>
              </div>
            </div>
          )
        }

      </form>
    </div>
  )
}


