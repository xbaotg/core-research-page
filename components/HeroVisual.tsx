import type { CSSProperties } from "react";

/**
 * Decorative "computer-vision" hero motif: a viewfinder frame with detection
 * boxes drawing in + labels, a keypoint feature graph, and a sweeping scan line.
 * Pure SVG + CSS (animations live in globals.css, .hv-*). No client JS.
 */
const box = (d: string): CSSProperties => ({ ["--d" as string]: d });

export default function HeroVisual() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-layered">
      {/* sweeping scan line */}
      <div className="hv-scan pointer-events-none absolute inset-x-0 top-0 h-16" aria-hidden />

      <svg
        viewBox="0 0 420 320"
        className="absolute inset-0 h-full w-full"
        fill="none"
        role="img"
        aria-label="Computer vision detection visualization"
      >
        <defs>
          <pattern id="hv-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="var(--color-hairline)" />
          </pattern>
          <linearGradient id="hv-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-accent-blue)" />
            <stop offset="1" stopColor="var(--color-accent-purple)" />
          </linearGradient>
        </defs>

        {/* feature-dot field */}
        <rect x="0" y="0" width="420" height="320" fill="url(#hv-dots)" opacity="0.6" />

        {/* keypoint feature graph */}
        <g className="hv-kp" stroke="var(--color-accent-purple)" strokeWidth="1" opacity="0.5">
          <polyline
            points="70,90 130,140 110,210 190,235 250,170 320,120 300,210"
            fill="none"
            strokeDasharray="3 5"
          />
        </g>
        <g fill="var(--color-accent-purple)">
          {[
            [70, 90], [130, 140], [110, 210], [190, 235], [250, 170], [320, 120], [300, 210],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              className="hv-kp"
              cx={cx}
              cy={cy}
              r="3.5"
              style={box(`${i * 0.25}s`)}
            />
          ))}
        </g>

        {/* viewfinder corner brackets */}
        <g stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" opacity="0.85">
          <path d="M22 44 V22 H44" />
          <path d="M398 44 V22 H376" />
          <path d="M22 276 V298 H44" />
          <path d="M398 276 V298 H376" />
        </g>

        {/* detection boxes (borders draw in, labels pop) */}
        <g>
          <rect
            className="hv-box-draw"
            x="56" y="74" width="120" height="150" rx="6"
            stroke="var(--color-accent-blue)" strokeWidth="2.5"
            style={box("0.2s")}
          />
          <g className="hv-box-label" style={box("0.7s")}>
            <rect x="56" y="58" width="92" height="18" rx="3" fill="var(--color-accent-blue)" />
            <text x="62" y="71" fontSize="11" fontWeight="700" fill="#fff" fontFamily="monospace">
              person 0.98
            </text>
          </g>
        </g>
        <g>
          <rect
            className="hv-box-draw"
            x="214" y="150" width="150" height="58" rx="6"
            stroke="var(--color-accent-orange)" strokeWidth="2.5"
            style={box("0.5s")}
          />
          <g className="hv-box-label" style={box("1s")}>
            <rect x="214" y="134" width="86" height="18" rx="3" fill="var(--color-accent-orange)" />
            <text x="220" y="147" fontSize="11" fontWeight="700" fill="#fff" fontFamily="monospace">
              scene-text
            </text>
          </g>
        </g>
        <g>
          <rect
            className="hv-box-draw"
            x="246" y="92" width="96" height="74" rx="6"
            stroke="var(--color-accent-pink)" strokeWidth="2.5"
            style={box("0.8s")}
          />
          <g className="hv-box-label" style={box("1.3s")}>
            <rect x="246" y="76" width="64" height="18" rx="3" fill="var(--color-accent-pink)" />
            <text x="252" y="89" fontSize="11" fontWeight="700" fill="#fff" fontFamily="monospace">
              object
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
