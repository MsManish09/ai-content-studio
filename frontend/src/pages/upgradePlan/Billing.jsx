import { useState } from "react";

export default function Billing() {
  const [loading, setLoading] = useState(false)

  const handlePayment = (e) => {
    e.preventDefault()
    setLoading(true)

    // simulate API call
    setTimeout(() => {
      alert("Payment Successful (Demo)")
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
            className="w-full mt-2 px-4 py-3 rounded-xl bg-(--color-bg-tertiary)] border border-(--color-border) focus:outline-none focus:border-(--color-border-strong) "
            required
          />
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-(--color-primary) text-(--color-text-on-primary) font-medium subtle-zoom"
        >
          {loading ? "Processing..." : "Pay ₹499 →"}
        </button>

        {/* Trust Text */}
        <p className="text-xs text-center text-(--color-text-muted)">
          This is a demo payment. No real charges will be made.
        </p>
      </form>
    </div>
  )
}