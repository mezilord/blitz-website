/**
 * Isometric chess scenes for the service pages.
 *
 * Everything is plain SVG built from a tiny isometric projection:
 *   proj(x, y, z) → screen point, where x/y run along the board and z is up.
 * Pieces are "turned" from a profile (height, radius) like on a lathe, so
 * pawn → king share one renderer; the knight gets a hand-drawn head.
 *
 * Motion: one orchestrated load sequence (tiles settle, piece drops, the
 * move is drawn and played), then a slow idle loop. Disabled entirely for
 * prefers-reduced-motion.
 */

export type SceneKind = "ai" | "web" | "ux" | "marketing" | "brand" | "logo" | "about";

const U = 54; // px per board unit
const PU = U * 1.32; // px per unit for pieces (pieces read larger than the grid)
const N = 5; // board size
const VB = 600; // viewBox size
const OX = VB / 2;
const OY = 262;

type P = [number, number];

function proj(x: number, y: number, z = 0): P {
  // centre the board around (OX, OY)
  const cx = x - N / 2;
  const cy = y - N / 2;
  return [OX + (cx - cy) * 0.866 * U, OY + (cx + cy) * 0.5 * U - z * U];
}

const pts = (ps: P[]) => ps.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

const colors = {
  tileLight: "#FFFFFF",
  tileDark: "#E7E3DA",
  slabLeft: "#D6D1C6",
  slabRight: "#C4BEB1",
  navy: "#062A3A",
  orange: "#F26322",
  teal: "#9FC8CA",
  cream: "#F3F1EB",
};

/* ------------------------------------------------------------------ */
/* Board                                                               */
/* ------------------------------------------------------------------ */

function Board({ highlights = [] as [number, number][], soft = [] as [number, number][], delayBase = 0 }) {
  const tiles = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const dark = (i + j) % 2 === 1;
      const hl = highlights.some(([a, b]) => a === i && b === j);
      const sf = !hl && soft.some(([a, b]) => a === i && b === j);
      tiles.push(
        <polygon
          key={`${i}-${j}`}
          className="iso-tile"
          style={{ ["--d" as string]: `${delayBase + (i + j) * 45}ms` }}
          points={pts([proj(i, j), proj(i + 1, j), proj(i + 1, j + 1), proj(i, j + 1)])}
          fill={hl ? "url(#iso-hl)" : sf ? (dark ? "#F3DED2" : "#FBEEE7") : dark ? colors.tileDark : colors.tileLight}
          stroke="#00000010"
          strokeWidth={0.6}
        />,
      );
    }
  }
  const t = 0.32;
  return (
    <g>
      {/* slab */}
      <polygon
        points={pts([proj(0, N), proj(N, N), proj(N, N, -t), proj(0, N, -t)])}
        fill={colors.slabLeft}
      />
      <polygon
        points={pts([proj(N, 0), proj(N, N), proj(N, N, -t), proj(N, 0, -t)])}
        fill={colors.slabRight}
      />
      {tiles}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

type Profile = [number, number][]; // [z, r] from the bottom up

const PROFILES: Record<string, Profile> = {
  pawn: [[0, .38], [.07, .38], [.1, .32], [.14, .3], [.18, .21], [.44, .13], [.5, .2], [.54, .2], [.57, .11]],
  bishop: [[0, .4], [.07, .4], [.11, .33], [.16, .31], [.2, .22], [.64, .13], [.7, .24], [.74, .24], [.78, .13]],
  rook: [[0, .42], [.07, .42], [.11, .36], [.16, .34], [.21, .27], [.7, .25], [.75, .34], [1.0, .34]],
  queen: [[0, .42], [.07, .42], [.11, .35], [.16, .33], [.2, .23], [.82, .13], [.88, .27], [.92, .27], [.95, .17], [1.14, .28]],
  king: [[0, .43], [.07, .43], [.11, .36], [.16, .34], [.2, .24], [.88, .14], [.94, .28], [.98, .28], [1.01, .17], [1.2, .26], [1.24, .12]],
  knight: [[0, .4], [.07, .4], [.11, .33], [.16, .31], [.24, .27]],
};

type Tone = "navy" | "cream" | "orange";

function ellipse(cx: number, cy: number, r: number, unit = PU) {
  return { cx, cy, rx: r * unit * 1.2247, ry: r * unit * 0.7071 };
}

function Lathe({ x, y, profile, tone }: { x: number; y: number; profile: Profile; tone: Tone }) {
  const [px, py] = proj(x, y);
  const parts = [];
  for (let k = 0; k < profile.length - 1; k++) {
    const [z0, r0] = profile[k];
    const [z1, r1] = profile[k + 1];
    const e0 = ellipse(px, py - z0 * PU, r0);
    const e1 = ellipse(px, py - z1 * PU, r1);
    const d = [
      `M ${e1.cx - e1.rx} ${e1.cy}`,
      `L ${e0.cx - e0.rx} ${e0.cy}`,
      `A ${e0.rx} ${e0.ry} 0 0 0 ${e0.cx + e0.rx} ${e0.cy}`,
      `L ${e1.cx + e1.rx} ${e1.cy}`,
      `A ${e1.rx} ${e1.ry} 0 0 1 ${e1.cx - e1.rx} ${e1.cy}`,
      "Z",
    ].join(" ");
    parts.push(<path key={`b${k}`} d={d} fill={`url(#iso-body-${tone})`} />);
    // ledge: when the next segment narrows, the top face is visible
    const next = profile[k + 2];
    if (!next || next[1] < r1) {
      parts.push(<ellipse key={`c${k}`} {...e1} fill={`url(#iso-cap-${tone})`} />);
    }
  }
  return <g>{parts}</g>;
}

function topOf(x: number, y: number, z: number): P {
  const [px, py] = proj(x, y);
  return [px, py - z * PU];
}

function Ball({ x, y, z, r, tone }: { x: number; y: number; z: number; r: number; tone: Tone }) {
  const [cx, cy] = topOf(x, y, z);
  return <circle cx={cx} cy={cy} r={r * PU * 1.1} fill={`url(#iso-ball-${tone})`} />;
}

export function Piece({
  kind,
  x,
  y,
  tone = "navy",
}: {
  kind: "pawn" | "bishop" | "rook" | "queen" | "king" | "knight";
  x: number;
  y: number;
  tone?: Tone;
}) {
  const extras = [];
  const [px, py] = proj(x, y);
  if (kind === "pawn") extras.push(<Ball key="h" x={x} y={y} z={0.76} r={0.2} tone={tone} />);
  if (kind === "bishop") {
    const [cx, cy] = topOf(x, y, 0.98);
    extras.push(
      <g key="m">
        <ellipse cx={cx} cy={cy} rx={0.22 * PU * 1.15} ry={0.3 * PU} fill={`url(#iso-ball-${tone})`} />
        <path
          d={`M ${cx - 4} ${cy - 10} L ${cx + 6} ${cy + 2}`}
          stroke={tone === "cream" ? "#B9B1A2" : "#021A24"}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <Ball x={x} y={y} z={1.34} r={0.065} tone={tone} />
      </g>,
    );
  }
  if (kind === "rook") {
    // three visible merlons on the rim
    const top = py - 1.0 * PU;
    const rx = 0.34 * PU * 1.2247;
    const ry = 0.34 * PU * 0.7071;
    [-0.62, 0, 0.62].forEach((t, i) => {
      const mx = px + t * rx;
      const my = top + Math.sqrt(1 - t * t) * ry;
      const w = rx * 0.42;
      extras.push(
        <g key={`m${i}`}>
          <rect x={mx - w / 2} y={my - 0.16 * PU} width={w} height={0.16 * PU} fill={`url(#iso-body-${tone})`} />
          <rect x={mx - w / 2} y={my - 0.16 * PU - 3} width={w} height={6} rx={3} fill={`url(#iso-cap-${tone})`} />
        </g>,
      );
    });
  }
  if (kind === "queen") {
    const top = py - 1.14 * PU;
    const rx = 0.28 * PU * 1.2247;
    const ry = 0.28 * PU * 0.7071;
    [-0.9, -0.45, 0, 0.45, 0.9].forEach((t, i) => {
      extras.push(
        <circle
          key={`q${i}`}
          cx={px + t * rx}
          cy={top + Math.sqrt(1 - t * t) * ry - 4}
          r={5.4}
          fill={`url(#iso-ball-${tone})`}
        />,
      );
    });
    extras.push(<Ball key="qt" x={x} y={y} z={1.3} r={0.08} tone={tone} />);
  }
  if (kind === "king") {
    const [cx, cy] = topOf(x, y, 1.24);
    extras.push(
      <g key="k" fill={`url(#iso-body-${tone})`}>
        <rect x={cx - 4.5} y={cy - 33} width={9} height={33} rx={2} />
        <rect x={cx - 14} y={cy - 24} width={28} height={9} rx={2} />
      </g>,
    );
  }
  if (kind === "knight") {
    // stylised horse head facing left, sitting on the turned base
    const s = PU / 100;
    const bx = px - 50 * s;
    const by = py - 0.24 * PU - 118 * s;
    const head =
      "M 18 118 C 18 96 26 84 22 74 C 8 66 2 56 6 46 C 10 38 20 36 30 30 C 34 20 36 10 40 2 C 46 10 48 16 50 20 C 64 22 80 34 84 54 C 88 74 84 96 80 118 Z";
    extras.push(
      <g key="n" transform={`translate(${bx} ${by}) scale(${s})`}>
        <path d={head} fill={`url(#iso-body-${tone})`} />
        <path d="M 50 20 C 66 26 78 40 82 58" fill="none" stroke={tone === "cream" ? "#ffffff" : "#3f7690"} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
        <circle cx={30} cy={44} r={3.5} fill={tone === "cream" ? "#8E8574" : "#F3F1EB"} />
      </g>,
    );
  }

  const profile = PROFILES[kind];
  return (
    <g>
      {/* contact shadow */}
      <ellipse {...ellipse(px, py, 0.46)} fill="#00000016" />
      <Lathe x={x} y={y} profile={profile} tone={tone} />
      {extras}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

function Box({ x, y, z, w, d, h, top, left, right }: { x: number; y: number; z: number; w: number; d: number; h: number; top: string; left: string; right: string }) {
  return (
    <g>
      <polygon points={pts([proj(x, y + d, z), proj(x + w, y + d, z), proj(x + w, y + d, z + h), proj(x, y + d, z + h)])} fill={left} />
      <polygon points={pts([proj(x + w, y, z), proj(x + w, y + d, z), proj(x + w, y + d, z + h), proj(x + w, y, z + h)])} fill={right} />
      <polygon points={pts([proj(x, y, z + h), proj(x + w, y, z + h), proj(x + w, y + d, z + h), proj(x, y + d, z + h)])} fill={top} />
    </g>
  );
}

/** A flat panel standing in the plane y = y0 (faces down-left). */
function Panel({ x0, x1, y0, z0, z1, fill, stroke, children }: { x0: number; x1: number; y0: number; z0: number; z1: number; fill: string; stroke?: string; children?: (q: (u: number, v: number) => P) => React.ReactNode }) {
  const q = (u: number, v: number): P => proj(x0 + u * (x1 - x0), y0, z1 - v * (z1 - z0));
  return (
    <g>
      <polygon points={pts([q(0, 0), q(1, 0), q(1, 1), q(0, 1)])} fill={fill} stroke={stroke} strokeWidth={1} />
      {children?.(q)}
    </g>
  );
}

const quad = (q: (u: number, v: number) => P, u0: number, v0: number, u1: number, v1: number) =>
  pts([q(u0, v0), q(u1, v0), q(u1, v1), q(u0, v1)]);

/* ------------------------------------------------------------------ */
/* Moves                                                               */
/* ------------------------------------------------------------------ */

function cellCenter(c: [number, number]): P {
  return proj(c[0] + 0.5, c[1] + 0.5);
}

function polyLength(ps: P[]) {
  let l = 0;
  for (let i = 1; i < ps.length; i++) l += Math.hypot(ps[i][0] - ps[i - 1][0], ps[i][1] - ps[i - 1][1]);
  return l;
}

function MovePath({ cells, delay }: { cells: [number, number][]; delay: number }) {
  const ps = cells.map(cellCenter);
  const len = polyLength(ps);
  const end = ps[ps.length - 1];
  return (
    <g>
      <polyline
        className="iso-path"
        style={{ ["--len" as string]: len, ["--d" as string]: `${delay}ms` }}
        points={pts(ps)}
        fill="none"
        stroke={colors.orange}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
      />
      <ellipse className="iso-pop" style={{ ["--d" as string]: `${delay + 700}ms` }} {...ellipse(end[0], end[1], 0.3, U)} fill="none" stroke={colors.orange} strokeWidth={2.5} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Scene definitions                                                    */
/* ------------------------------------------------------------------ */

type PieceKind = "pawn" | "bishop" | "rook" | "queen" | "king" | "knight";

type SceneDef = {
  hero: { kind: PieceKind; from: [number, number]; path: [number, number][] };
  others?: { kind: PieceKind; at: [number, number]; tone: Tone }[];
  highlights?: [number, number][];
  soft?: [number, number][];
  back?: React.ReactNode; // drawn behind the board's far pieces
  front?: React.ReactNode; // drawn above everything
};

function sceneFor(kind: SceneKind): SceneDef {
  switch (kind) {
    case "ai":
      return {
        hero: { kind: "knight", from: [1, 3], path: [[1, 3], [1, 1], [2, 1]] },
        others: [{ kind: "pawn", at: [3, 3], tone: "cream" }],
        highlights: [[2, 1]],
        front: (
          <g className="iso-float" style={{ ["--d" as string]: "0ms" }}>
            {[[0.2, 0.6, 1.9], [1.8, -0.3, 2.3], [3.4, 0.4, 1.7], [1.2, -1.3, 2.7]].map(([x, y, z], i, a) => (
              <g key={i}>
                {i > 0 && (
                  <line
                    x1={proj(a[i - 1][0] + 0.15, a[i - 1][1] + 0.15, a[i - 1][2] + 0.3)[0]}
                    y1={proj(a[i - 1][0] + 0.15, a[i - 1][1] + 0.15, a[i - 1][2] + 0.3)[1]}
                    x2={proj(x + 0.15, y + 0.15, z + 0.3)[0]}
                    y2={proj(x + 0.15, y + 0.15, z + 0.3)[1]}
                    stroke={colors.navy}
                    strokeOpacity={0.35}
                    strokeWidth={1.4}
                    strokeDasharray="4 4"
                  />
                )}
                <Box x={x} y={y} z={z} w={0.3} d={0.3} h={0.3} top={i === 3 ? "#FF8A52" : "#3E7189"} left={i === 3 ? colors.orange : colors.navy} right={i === 3 ? "#B8441A" : "#021A24"} />
              </g>
            ))}
          </g>
        ),
      };
    case "web":
      return {
        hero: { kind: "rook", from: [3, 4], path: [[3, 4], [3, 2]] },
        others: [{ kind: "pawn", at: [1, 3], tone: "cream" }],
        highlights: [[3, 2]],
        back: (
          <g className="iso-float" style={{ ["--d" as string]: "0ms" }}>
            <Panel x0={0.6} x1={3.6} y0={-0.5} z0={0.5} z1={2.2} fill="#FFFFFF" stroke="#0000001A">
              {(q) => (
                <>
                  <polygon points={quad(q, 0, 0, 1, 0.13)} fill={colors.navy} />
                  {[0.04, 0.08, 0.12].map((u, i) => (
                    <circle key={i} cx={q(u, 0.065)[0]} cy={q(u, 0.065)[1]} r={2.6} fill={i === 0 ? colors.orange : "#F3F1EB"} />
                  ))}
                  <polygon points={quad(q, 0.08, 0.25, 0.6, 0.38)} fill={colors.navy} />
                  <polygon points={quad(q, 0.08, 0.45, 0.45, 0.5)} fill="#D9D5CB" />
                  <polygon points={quad(q, 0.08, 0.55, 0.38, 0.6)} fill="#D9D5CB" />
                  <polygon points={quad(q, 0.08, 0.7, 0.3, 0.82)} fill={colors.orange} />
                  <polygon points={quad(q, 0.66, 0.25, 0.92, 0.82)} fill={colors.teal} opacity={0.7} />
                </>
              )}
            </Panel>
          </g>
        ),
        front: (
          <g className="iso-float" style={{ ["--d" as string]: "1200ms" }}>
            <Panel x0={4.25} x1={5.05} y0={1.4} z0={0.7} z1={2.15} fill={colors.navy}>
              {(q) => (
                <>
                  <polygon points={quad(q, 0.08, 0.06, 0.92, 0.94)} fill="#FFFFFF" />
                  <polygon points={quad(q, 0.16, 0.14, 0.84, 0.36)} fill={colors.teal} opacity={0.8} />
                  <polygon points={quad(q, 0.16, 0.44, 0.7, 0.5)} fill="#D9D5CB" />
                  <polygon points={quad(q, 0.16, 0.56, 0.6, 0.62)} fill="#D9D5CB" />
                  <polygon points={quad(q, 0.16, 0.74, 0.84, 0.86)} fill={colors.orange} />
                </>
              )}
            </Panel>
          </g>
        ),
      };
    case "ux":
      return {
        hero: { kind: "bishop", from: [0, 4], path: [[0, 4], [1, 3], [2, 2], [3, 1]] },
        others: [{ kind: "pawn", at: [4, 3], tone: "cream" }],
        highlights: [[1, 3], [2, 2], [3, 1]],
        back: (
          <g className="iso-float" style={{ ["--d" as string]: "400ms" }}>
            <Panel x0={1.3} x1={4.5} y0={-0.6} z0={0.75} z1={2.45} fill="#FFFFFF" stroke={colors.navy}>
              {(q) => (
                <>
                  {[0.08, 0.38, 0.68].map((u, i) => (
                    <polygon key={i} points={quad(q, u, 0.12, u + 0.24, 0.62)} fill="none" stroke={colors.navy} strokeOpacity={0.45} strokeDasharray="4 3" />
                  ))}
                  <polygon points={quad(q, 0.38, 0.12, 0.62, 0.62)} fill={colors.orange} fillOpacity={0.15} stroke={colors.orange} />
                  <polygon points={quad(q, 0.08, 0.74, 0.92, 0.86)} fill={colors.navy} fillOpacity={0.12} />
                </>
              )}
            </Panel>
          </g>
        ),
      };
    case "marketing": {
      const rays: [number, number][] = [];
      for (let k = 0; k < N; k++) {
        if (k !== 2) {
          rays.push([2, k], [k, 2]);
        }
        if (k !== 2 && k >= 0) {
          rays.push([k, k]);
          rays.push([k, 4 - k]);
        }
      }
      return {
        hero: { kind: "queen", from: [2, 2], path: [[2, 2], [4, 0]] },
        highlights: [[4, 0]],
        soft: rays,
        back: (
          <g>
            {[
              [0.3, -1.25, 0.7],
              [1.3, -1.25, 1.15],
              [2.3, -1.25, 1.7],
            ].map(([x, y, h], i) => (
              <g key={i} className="iso-grow" style={{ ["--d" as string]: `${900 + i * 160}ms` }}>
                <Box x={x} y={y} z={0} w={0.55} d={0.55} h={h} top={i === 2 ? "#FF8A52" : "#3E7189"} left={i === 2 ? colors.orange : colors.navy} right={i === 2 ? "#B8441A" : "#021A24"} />
              </g>
            ))}
          </g>
        ),
      };
    }
    case "brand":
      return {
        hero: { kind: "king", from: [2, 2], path: [[2, 2], [2, 1]] },
        others: [
          { kind: "pawn", at: [0, 2], tone: "cream" },
          { kind: "pawn", at: [2, 4], tone: "cream" },
        ],
        highlights: [[2, 1]],
        back: (
          <g className="iso-float" style={{ ["--d" as string]: "300ms" }}>
            {[colors.navy, colors.orange, colors.teal, colors.cream].map((c, i) => (
              <Box key={i} x={3.3 - i * 0.1} y={-0.9 + i * 0.42} z={1.25 + i * 0.3} w={1.2} d={0.7} h={0.08} top={c} left="#00000033" right="#00000055" />
            ))}
          </g>
        ),
      };
    case "logo":
      return {
        hero: { kind: "pawn", from: [2, 1], path: [[2, 1], [2, 0]] },
        highlights: [[2, 0]],
        front: (
          <g className="iso-ghost" style={{ ["--d" as string]: "1700ms" }}>
            {(() => {
              const [cx, cy] = proj(2.5, 0.5, 1.15);
              return (
                <g transform={`translate(${cx} ${cy}) scale(1.5)`} fill="none" stroke={colors.orange} strokeWidth={1.6} strokeDasharray="4 3">
                  <path d="M -24 0 L -18 -34 L -9 -14 L 0 -40 L 9 -14 L 18 -34 L 24 0 Z" />
                  <path d="M -24 6 L 24 6" />
                </g>
              );
            })()}
          </g>
        ),
      };
    case "about":
      return {
        hero: { kind: "knight", from: [1, 4], path: [[1, 4], [1, 2], [2, 2]] },
        others: [
          { kind: "king", at: [3, 1], tone: "cream" },
          { kind: "pawn", at: [3, 3], tone: "cream" },
        ],
        highlights: [[2, 2]],
      };
  }
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export function IsoScene({ kind, className }: { kind: SceneKind; className?: string }) {
  const def = sceneFor(kind);
  const from = def.hero.from;
  const to = def.hero.path[def.hero.path.length - 1];
  const [fx, fy] = proj(from[0] + 0.5, from[1] + 0.5);
  const [tx, ty] = proj(to[0] + 0.5, to[1] + 0.5);
  const dx = (tx - fx).toFixed(1);
  const dy = (ty - fy).toFixed(1);
  const id = `iso-move-${kind}`;

  // painter's order: far cells (small i+j) first
  const actors = [
    ...(def.others ?? []).map((o) => ({ ...o, depth: o.at[0] + o.at[1], hero: false })),
    { kind: def.hero.kind, at: from, tone: "navy" as Tone, depth: Math.max(from[0] + from[1], to[0] + to[1]), hero: true },
  ].sort((a, b) => a.depth - b.depth);

  return (
    <svg
      viewBox={`0 0 ${VB} 450`}
      preserveAspectRatio="xMidYMid meet"
      className={`iso-scene ${className ?? ""}`}
      role="img"
      aria-label={`Isometric chessboard illustration`}
    >
      <defs>
        <linearGradient id="iso-body-navy" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3E7189" />
          <stop offset="0.45" stopColor="#0B3A4F" />
          <stop offset="1" stopColor="#031822" />
        </linearGradient>
        <linearGradient id="iso-cap-navy" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#5B8FA6" />
          <stop offset="1" stopColor="#1D5068" />
        </linearGradient>
        <radialGradient id="iso-ball-navy" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#6497AD" />
          <stop offset="0.5" stopColor="#0E3E54" />
          <stop offset="1" stopColor="#031822" />
        </radialGradient>
        <linearGradient id="iso-body-cream" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#ECE8DF" />
          <stop offset="1" stopColor="#C9C1B2" />
        </linearGradient>
        <linearGradient id="iso-cap-cream" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E2DDD2" />
        </linearGradient>
        <radialGradient id="iso-ball-cream" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#E7E2D8" />
          <stop offset="1" stopColor="#BDB4A3" />
        </radialGradient>
        <linearGradient id="iso-body-orange" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FF9A66" />
          <stop offset="0.5" stopColor="#F26322" />
          <stop offset="1" stopColor="#A63B12" />
        </linearGradient>
        <linearGradient id="iso-cap-orange" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB38C" />
          <stop offset="1" stopColor="#F26322" />
        </linearGradient>
        <radialGradient id="iso-ball-orange" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#FFB38C" />
          <stop offset="1" stopColor="#B8441A" />
        </radialGradient>
        <linearGradient id="iso-hl" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#FDE3D6" />
          <stop offset="1" stopColor="#F9C9B1" />
        </linearGradient>
      </defs>

      <style>{`
        .iso-scene .iso-tile{animation:iso-tile .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d)}
        .iso-scene .iso-drop{animation:iso-drop .9s cubic-bezier(.2,.9,.3,1.15) both;animation-delay:var(--d)}
        .iso-scene .iso-path{stroke-dashoffset:var(--len);animation:iso-draw .9s ease-out forwards;animation-delay:var(--d)}
        .iso-scene .iso-pop{opacity:0;transform-box:fill-box;transform-origin:center;animation:iso-pop .5s ease-out forwards;animation-delay:var(--d)}
        .iso-scene .iso-float{animation:iso-float 7s ease-in-out infinite;animation-delay:var(--d)}
        .iso-scene .iso-grow{transform-box:fill-box;transform-origin:50% 100%;animation:iso-grow .8s cubic-bezier(.2,.9,.3,1.1) both;animation-delay:var(--d)}
        .iso-scene .iso-ghost{opacity:0;animation:iso-fade .6s ease-out forwards;animation-delay:var(--d)}
        .iso-scene .${id}{animation:${id} 9s cubic-bezier(.65,0,.35,1) 1.6s infinite}
        @keyframes iso-tile{from{opacity:0;transform:translateY(-14px)}}
        @keyframes iso-drop{from{opacity:0;transform:translateY(-70px)}}
        @keyframes iso-draw{to{stroke-dashoffset:0}}
        @keyframes iso-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
        @keyframes iso-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes iso-grow{from{transform:scaleY(0)}}
        @keyframes iso-fade{to{opacity:1}}
        @keyframes ${id}{0%,6%{transform:translate(0,0)}22%,72%{transform:translate(${dx}px,${dy}px)}88%,100%{transform:translate(0,0)}}
        @media (prefers-reduced-motion: reduce){
          .iso-scene *{animation:none!important}
          .iso-scene .iso-path{stroke-dashoffset:0}
          .iso-scene .iso-pop,.iso-scene .iso-ghost{opacity:1}
        }
      `}</style>

      {def.back}
      <Board highlights={def.highlights} soft={def.soft} />
      <MovePath cells={def.hero.path} delay={1100} />

      {actors.map((a, i) =>
        a.hero ? (
          <g key="hero" className="iso-drop" style={{ ["--d" as string]: "650ms" }}>
            <g className={id}>
              <Piece kind={a.kind} x={a.at[0] + 0.5} y={a.at[1] + 0.5} tone="navy" />
            </g>
          </g>
        ) : (
          <g key={i} className="iso-drop" style={{ ["--d" as string]: `${450 + i * 90}ms` }}>
            <Piece kind={a.kind} x={a.at[0] + 0.5} y={a.at[1] + 0.5} tone={a.tone} />
          </g>
        ),
      )}

      {def.front}
    </svg>
  );
}
