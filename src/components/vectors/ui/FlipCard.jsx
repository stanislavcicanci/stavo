import { useEffect,useRef } from "react";

export default function FlipCard({ title, price, img, isFlipped, onFlip }) {
  const shimmerRef = useRef(null);

  return (
    <div
      className="w-full h-[440px] cursor-pointer [perspective:2000px] group"
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full [transform-style:preserve-3d] will-change-transform"
        style={{
          transform: isFlipped
            ? "translateZ(0) rotateY(180deg)"
            : "translateZ(0) rotateY(0deg)",
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#0f111a] border border-neutral-800 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          {/* Image container */}
          <div className="w-[75%] h-[65%] bg-neutral-900/60 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-800">
            <img
              src={img}
              alt={title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain p-4 transition-transform duration-500"
              style={{
                transform: isFlipped
                  ? "translateZ(0) scale(1.05)"
                  : "translateZ(0) scale(1)",
                willChange: "transform",
              }}
            />
          </div>

          <p className="text-white mt-4 text-lg font-semibold tracking-wide">
            {title}
          </p>

          {/* ── Reveal strip ── */}
          <div className="absolute bottom-0 left-0 right-0 h-14 overflow-hidden rounded-b-2xl">
            {/* dark base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            {/* shimmer sweep */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmerSweep 2.4s ease-in-out infinite",
              }}
            />

            {/* label row */}
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              {/* animated dots */}
              <span className="flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block w-1 h-1 rounded-full bg-white/60"
                    style={{
                      animation: `dotPulse 1.4s ease-in-out ${i * 0.22}s infinite`,
                    }}
                  />
                ))}
              </span>

              <span
                className="text-white/70 text-xs font-medium tracking-[0.18em] uppercase select-none"
                style={{ letterSpacing: "0.18em" }}
              >
                Reveal price
              </span>

              {/* tag icon */}
              <svg
                className="w-3.5 h-3.5 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 7h.01M7 3H5a2 2 0 00-2 2v2l9.5 9.5a2 2 0 002.83 0l3.17-3.17a2 2 0 000-2.83L9 3H7z"
                />
              </svg>
            </div>
          </div>

          {/* hover glow ring */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              transition: "opacity 0.3s ease",
            }}
          />
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#0a0a0f] border border-neutral-800 flex flex-col items-center justify-center gap-1 overflow-hidden"
          style={{
            transform: "rotateY(180deg) translateZ(0)",
            WebkitTransform: "rotateY(180deg) translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* ambient glow behind price */}
          <div
            className="absolute w-48 h-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          <p className="text-neutral-500 text-xs tracking-[0.25em] uppercase relative">
            Price
          </p>

          <p className="text-red-500 text-5xl font-bold relative" style={{ letterSpacing: "-0.02em" }}>
            {price}
          </p>

          <p className="text-neutral-600 text-xs mt-3 relative tracking-wide">
            Click to flip back
          </p>
        </div>
      </div>

      {/* keyframes injected once */}
      <style>{`
        @keyframes shimmerSweep {
          0%   { background-position: 200% 0; }
          60%  { background-position: -200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
          40%            { opacity: 1;   transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}