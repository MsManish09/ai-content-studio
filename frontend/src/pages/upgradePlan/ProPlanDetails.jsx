import { useNavigate } from "react-router-dom";

export default function ProPlanDetailsPage() {

    const navigate = useNavigate()

  return (
    <div className="min-h-screen px-6 py-16 bg-(--color-bg-primary) text-(--color-text-primary)">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-semibold mb-4">
          Unlock the full power of AI content
        </h1>
        <p className="text-(--color-text-secondary) text-lg">
          Upgrade to Pro and create without limits. Faster, smarter, and built for real work.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        
        {/* FREE PLAN */}
        <div className="border border-(--color-border) bg-(--color-bg-secondary) rounded-2xl p-8">
          <h2 className="text-xl font-medium mb-2">Free</h2>
          <p className="text-(--color-text-muted) mb-6">
            Get started and explore the platform
          </p>

          <h3 className="text-3xl font-semibold mb-6">₹0</h3>

          <ul className="space-y-3 text-(--color-text-secondary) mb-8">
            <li>• Limited generations per day</li>
            <li>• Basic AI responses</li>
            <li>• Standard speed</li>
            <li>• Limited history access</li>
          </ul>

          <button className="w-full py-3 rounded-xl border border-(--color-border) text-(--color-text-muted) ">
            Current Plan
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="border border-(--color-border-strong) bg-(--color-bg-tertiary) rounded-2xl p-8 relative">
          
          {/* Badge */}
          <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-(--color-accent-soft) text-(--color-text-secondary) ">
            Most Popular
          </span>

          <h2 className="text-xl font-medium mb-2">Pro</h2>
          <p className="text-(--color-text-muted)  mb-6">
            Built for serious creators & marketers
          </p>

          <h3 className="text-3xl font-semibold mb-6">
            ₹499<span className="text-base text-(--color-text-muted) ">/mo</span>
          </h3>

          <ul className="space-y-3 text-(--color-text-secondary) mb-8">
            <li>• Unlimited content generation</li>
            <li>• Faster AI responses</li>
            <li>• Higher-quality outputs</li>
            <li>• Full history access</li>
            <li>• Priority performance</li>
          </ul>

          <button className="w-full py-3 rounded-xl bg-(--color-primary) text-(--color-text-on-primary) font-medium subtle-zoom" onClick={()=>navigate('/billing')}>
            Upgrade to Pro →
          </button>

          <p className="text-xs text-center mt-4 text-(--color-text-muted) ">
            Cancel anytime • Instant activation
          </p>
        </div>
      </div>

      {/* Bottom Persuasion Section */}
      <div className="max-w-3xl mx-auto text-center mt-16">
        <p className="text-(--color-text-secondary) text-lg">
          Every day you hit limits is content you didn’t publish.
        </p>
        <p className="text-(--color-text-muted) mt-2">
          Upgrade now and stay ahead.
        </p>
      </div>
    </div>
  )
}