/**
 * Silk Road route map — animated SVG.
 * Cartographer-style dashed routes from Kabul branching across Eurasia,
 * with pulsing city nodes and a moving caravan dot.
 */
export function HeroCanvas() {
  // Cities along the historic Silk Road (positioned in a 1000x560 viewBox).
  const cities = [
    { name: "Tehran", x: 130, y: 230 },
    { name: "Damascus", x: 60, y: 260 },
    { name: "Samarkand", x: 320, y: 170 },
    { name: "Bukhara", x: 270, y: 200 },
    { name: "Kabul", x: 360, y: 260, hub: true },
    { name: "Kashgar", x: 500, y: 230 },
    { name: "Khotan", x: 530, y: 280 },
    { name: "Dunhuang", x: 680, y: 220 },
    { name: "Lanzhou", x: 800, y: 250 },
    { name: "Xi'an", x: 880, y: 280 },
    { name: "Frankfurt", x: 50, y: 130 },
    { name: "Istanbul", x: 100, y: 200 },
    { name: "Dubai", x: 220, y: 340 },
    { name: "Mumbai", x: 380, y: 400 },
  ];

  // Route segments: connects pairs by city name.
  const routes: [string, string][] = [
    ["Frankfurt", "Istanbul"],
    ["Istanbul", "Damascus"],
    ["Damascus", "Tehran"],
    ["Tehran", "Bukhara"],
    ["Bukhara", "Samarkand"],
    ["Samarkand", "Kabul"],
    ["Tehran", "Kabul"],
    ["Kabul", "Kashgar"],
    ["Kashgar", "Khotan"],
    ["Khotan", "Dunhuang"],
    ["Kashgar", "Dunhuang"],
    ["Dunhuang", "Lanzhou"],
    ["Lanzhou", "Xi'an"],
    ["Kabul", "Dubai"],
    ["Kabul", "Mumbai"],
    ["Dubai", "Mumbai"],
  ];

  const byName = Object.fromEntries(cities.map((c) => [c.name, c]));

  // Build a curved path between two points (gentle bow).
  const curve = (a: { x: number; y: number }, b: { x: number; y: number }, bow = 24) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - bow;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <svg
      viewBox="0 0 1000 560"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="oklch(0.94 0.04 85)" stopOpacity="0" />
          <stop offset="100%" stopColor="oklch(0.82 0.08 60)" stopOpacity="0.55" />
        </radialGradient>
        <pattern id="paper" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="oklch(0.94 0.04 85)" />
          <circle cx="20" cy="40" r="60" fill="oklch(0.86 0.07 55)" opacity="0.15" />
          <circle cx="130" cy="120" r="50" fill="oklch(0.84 0.08 45)" opacity="0.12" />
        </pattern>
        <filter id="ink-blur">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Aged paper background */}
      <rect width="1000" height="560" fill="url(#paper)" />
      <rect width="1000" height="560" fill="url(#vignette)" />

      {/* Latitude / longitude grid */}
      <g stroke="oklch(0.28 0.04 40 / 0.08)" strokeWidth="0.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="560" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 80} x2="1000" y2={i * 80} />
        ))}
      </g>

      {/* Subtle continental landmasses (suggested) */}
      <g fill="oklch(0.86 0.07 60)" opacity="0.5" filter="url(#ink-blur)">
        <path d="M 0 100 Q 200 80 400 110 T 800 100 L 1000 90 L 1000 200 Q 700 220 400 200 T 0 220 Z" />
        <path d="M 0 320 Q 250 340 500 330 T 1000 350 L 1000 460 Q 600 480 300 470 T 0 460 Z" />
      </g>

      {/* Compass rose (top-right) */}
      <g transform="translate(920, 70)" stroke="oklch(0.28 0.04 40 / 0.5)" fill="none" strokeWidth="0.8">
        <circle r="28" />
        <circle r="20" />
        <path d="M 0 -28 L 4 0 L 0 28 L -4 0 Z" fill="oklch(0.831 0.170 81.4 / 0.7)" stroke="none" />
        <path d="M -28 0 L 0 -4 L 28 0 L 0 4 Z" fill="oklch(0.28 0.04 40 / 0.4)" stroke="none" />
        <text y="-34" textAnchor="middle" fontSize="9" fill="oklch(0.28 0.04 40 / 0.7)" fontFamily="serif">N</text>
      </g>

      {/* Routes — animated drawing */}
      <g fill="none" stroke="oklch(0.831 0.170 81.4 / 0.85)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="6 5">
        {routes.map(([a, b], i) => {
          const ca = byName[a];
          const cb = byName[b];
          if (!ca || !cb) return null;
          const d = curve(ca, cb, Math.abs(ca.x - cb.x) * 0.08);
          return (
            <path
              key={`${a}-${b}`}
              d={d}
              style={{
                strokeDasharray: "600",
                strokeDashoffset: "600",
                animation: `route-draw 2.5s ease-out ${0.3 + i * 0.12}s forwards`,
              }}
            />
          );
        })}
      </g>

      {/* Caravan dot moving Kabul → Xi'an */}
      <circle r="3.5" fill="oklch(0.831 0.170 81.4)">
        <animateMotion
          dur="9s"
          repeatCount="indefinite"
          path={`${curve(byName["Kabul"], byName["Kashgar"], 12)} ${curve(byName["Kashgar"], byName["Dunhuang"], 14)} ${curve(byName["Dunhuang"], byName["Xi'an"], 10)}`}
        />
      </circle>

      {/* Cities */}
      <g fontFamily="serif" fontSize="9" fill="oklch(0.28 0.04 40)">
        {cities.map((c) => (
          <g key={c.name} transform={`translate(${c.x}, ${c.y})`}>
            {c.hub ? (
              <>
                <circle r="8" fill="oklch(0.831 0.170 81.4 / 0.25)" />
                <circle r="4.5" fill="oklch(0.303 0.137 264.7)" />
                <circle r="2" fill="oklch(0.94 0.04 85)" />
                <text x="10" y="3" fontSize="11" fontWeight="600" letterSpacing="2">
                  KABUL
                </text>
              </>
            ) : (
              <>
                <circle
                  r="2.2"
                  fill="oklch(0.28 0.04 40)"
                  style={{ animation: `pulse-city 3.2s ease-in-out infinite` }}
                />
                <text x="6" y="3" opacity="0.7">{c.name}</text>
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
