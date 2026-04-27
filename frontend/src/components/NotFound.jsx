import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-(--color-bg-primary) text-(--color-text-primary) ">

      {/* HUGE background 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[22vw] font-extrabold tracking-tight text-(--color-primary) opacity-[0.06] leading-none">
          404
        </h1>
      </div>

      {/* soft radial glow */}
      <div className="absolute w-[600px] h-[600px] bg-(--color-accent-soft)/30 blur-3xl rounded-full" />

      {/* main card */}
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl border border-(--color-border-strong) bg-(--color-bg-secondary)/80 backdrop-blur-xl p-8 shadow-xl">

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Page not found
          </h2>

          <p className="text-(--color-text-secondary) mb-8 text-sm leading-relaxed">
            The page you’re trying to access doesn’t exist or may have been moved.
          </p>
        </div>

        {/* actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 text-center px-5 py-3 rounded-lg text-sm font-medium bg-(--color-primary) text-(--color-text-on-primary) transition hover:opacity-90 hover:scale-[1.02]"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex-1 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-border) text-(--color-text-secondary) transition hover:bg-(--color-accent-soft) "
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}