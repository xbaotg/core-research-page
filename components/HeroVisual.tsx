import type { CSSProperties } from "react";

const d = (v: string): CSSProperties => ({ ["--d" as string]: v });

const COLORS = {
  blue: "#3b89ff",
  pink: "#ed52cb",
  orange: "#ff8105",
  purple: "#7a3dff",
};

// Four corner brackets for a detection box (pro tracker look).
function Box({
  x,
  y,
  w,
  h,
  color,
  delay,
  len = 16,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  delay: string;
  len?: number;
}) {
  const sw = 2.5;
  return (
    <g className="hv2-box" style={{ color, ...d(delay) }}>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={color} opacity={0.07} />
      <path d={`M${x} ${y + len} V${y} H${x + len}`} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
      <path d={`M${x + w - len} ${y} H${x + w} V${y + len}`} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
      <path d={`M${x + w} ${y + h - len} V${y + h} H${x + w - len}`} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
      <path d={`M${x + len} ${y + h} H${x} V${y + h - len}`} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
}

function Label({ x, y, text, color, delay }: { x: number; y: number; text: string; color: string; delay: string }) {
  const w = text.length * 6.6 + 26;
  return (
    <g className="hv2-label" style={d(delay)}>
      <rect x={x} y={y} width={w} height={19} rx={4} fill={color} />
      <circle className="hv2-blink" cx={x + 11} cy={y + 9.6} r={3} fill="#fff" />
      <text x={x + 20} y={y + 13.6} fontSize={11} fontWeight={700} fill="#fff" fontFamily="monospace">
        {text}
      </text>
    </g>
  );
}

/**
 * Hero "vision HUD" — a dark detector screen with a gradient-glow frame:
 * corner-bracket detection boxes drawing in, a keypoint constellation,
 * a glowing scan sweep and a small live-HUD overlay. SVG + CSS, no JS.
 */
export default function HeroVisual() {
  const nodes = [
    [60, 80], [120, 130], [100, 202], [180, 226], [250, 160], [322, 108], [296, 202],
  ];
  return (
    <div className="hv2-frame relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <svg
        viewBox="0 0 420 320"
        className="absolute inset-0 h-full w-full"
        fill="none"
        role="img"
        aria-label="Computer vision detection visualization"
      >
        <defs>
          <linearGradient id="hv2bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0a0f1a" />
            <stop offset="1" stopColor="#141f31" />
          </linearGradient>
          <radialGradient id="hv2glowA" cx="0.28" cy="0.26" r="0.6">
            <stop offset="0" stopColor="#3b89ff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#3b89ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hv2glowB" cx="0.82" cy="0.84" r="0.6">
            <stop offset="0" stopColor="#ed52cb" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ed52cb" stopOpacity="0" />
          </radialGradient>
          <pattern id="hv2grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="420" height="320" fill="url(#hv2bg)" />
        <rect width="420" height="320" fill="url(#hv2glowA)" />
        <rect width="420" height="320" fill="url(#hv2glowB)" />
        <rect width="420" height="320" fill="url(#hv2grid)" />

        {/* keypoint feature graph */}
        <polyline
          className="hv2-net"
          points="60,80 120,130 100,202 180,226 250,160 322,108 296,202"
          fill="none"
          stroke={COLORS.purple}
          strokeWidth="1"
          strokeOpacity="0.55"
        />
        {nodes.map(([cx, cy], i) => (
          <circle key={i} className="hv2-node" cx={cx} cy={cy} r="3" fill={COLORS.blue} style={d(`${i * 0.2}s`)} />
        ))}

        {/* detection boxes */}
        <Box x={48} y={70} w={118} h={158} color={COLORS.blue} delay="0.2s" />
        <Box x={238} y={150} w={150} h={60} color={COLORS.orange} delay="0.45s" />
        <Box x={250} y={86} w={92} h={74} color={COLORS.pink} delay="0.7s" />

        <Label x={48} y={51} text="track · 2" color={COLORS.blue} delay="0.7s" />
        <Label x={238} y={131} text="scene-text" color={COLORS.orange} delay="0.95s" />
        <Label x={250} y={67} text="object 0.94" color={COLORS.pink} delay="1.2s" />

        {/* post-scan output: retrieved matches with confidence bars */}
        <g className="hv2-results">
          <rect x="236" y="236" width="168" height="74" rx="6" fill="#0e1626" stroke="#ffffff" strokeOpacity="0.12" />
          <text x="246" y="252" fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#7f8ba0" fontFamily="monospace">
            RETRIEVED
          </text>
          {[
            { y: 269, c: COLORS.blue, label: "track", w: 64 },
            { y: 285, c: COLORS.orange, label: "scene-text", w: 52 },
            { y: 301, c: COLORS.pink, label: "object", w: 69 },
          ].map((r) => (
            <g key={r.label}>
              <circle cx="248" cy={r.y - 3} r="3" fill={r.c} />
              <text x="256" y={r.y} fontSize="9" fill="#cdd6e4" fontFamily="monospace">
                {r.label}
              </text>
              <rect x="320" y={r.y - 5} width="74" height="5" rx="2" fill="#ffffff" opacity="0.09" />
              <rect className="hv2-bar" x="320" y={r.y - 5} width={r.w} height="5" rx="2" fill={r.c} />
            </g>
          ))}
        </g>
      </svg>

      {/* glowing scan sweep */}
      <span className="hv2-scan pointer-events-none absolute inset-x-0 top-0 h-1/4" aria-hidden />

      {/* live HUD overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 font-mono text-[10px] uppercase tracking-widest text-white/70">
        <div className="flex items-center justify-between">
          <span>CORE · vision</span>
          <span className="flex items-center gap-1.5">
            <span className="hv2-blink inline-block h-1.5 w-1.5 rounded-full bg-[#ff5470]" />
            rec
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>detecting text &amp; objects</span>
          <span className="text-white/50">realtime</span>
        </div>
      </div>
    </div>
  );
}
