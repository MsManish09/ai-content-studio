import { IoMdClose } from "react-icons/io";

export default function WelcomeModal({user, onClose}){

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md mx-4 bg-(--color-bg-secondary) border border-(--color-border)] rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-(--color-border)">

          <div className="text-xs font-medium tracking-[0.2em] uppercase text-(--color-text-muted) ">
            Welcome
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-(--color-text-muted) hover:text-(--color-primary-light) hover:bg-(--color-bg-tertiary) hover:scale-105 transition"
          >
            <IoMdClose className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Nice to meet you, {user?.name}.
            </h2>
            <p className="mt-1 text-sm text-(--color-text-muted) ">
              Your account has been created successfully. You&apos;re all set to
              start generating high-quality AI content.
            </p>
          </div>

          <div className="rounded-xl bg-(--color-bg-tertiary) border border-(--color-border) px-4 py-3 text-xs text-(--color-text-secondary)">
            <p className="font-medium mb-1">
              What you can do from here:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Explore templates tailored to your content needs.</li>
              <li>Save and revisit your favorite generations.</li>
              <li>Iterate quickly with history and refinements.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-1 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-(--color-primary) text-(--color-text-on-primary) hover:bg-(--color-accent-hover) hover:scale-105 transition" >
              Start creating
          </button>
        </div>
      </div>
    </div>
  )


}