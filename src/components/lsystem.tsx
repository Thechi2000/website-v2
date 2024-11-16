export interface LSystem {
  axiom: string;
  rules: { [key: string]: string };
  angle: number;
  draw: string[];
}

export const HILBERT: LSystem = {
  axiom: "X",
  rules: {
    X: "-YF+XFX+FY-",
    Y: "+XF-YFY-FX+",
  },
  draw: ["F"],
  angle: Math.PI / 2,
}
export const PEANO_GOSPER: LSystem = {
  axiom: "X",
  rules: {
    X: "X+YF++YF-FX--FXFX-YF+",
    Y: "-FX+YFYF++YF+FX--FX-Y",
  },
  draw: ["F", "X", "Y"],
  angle: Math.PI / 3,
};

export function iterate(lsystem: LSystem, iterations: number) {
  let value = lsystem.axiom;

  for (let i = 0; i < iterations; ++i) {
    let next = "";
    for (const char of value) {
      next += lsystem.rules[char] || char;
    }
    value = next;
  }

  return value;
}

export function LSystemRenderer({
  lsystem,
  iterations,
  length,
  margin = 0,
  stroke,
}: {
  lsystem: LSystem;
  iterations: number;
  length: number;
  margin?: number;
  stroke: { color: string; width: number };
}) {
  let path = "";
  let angle = 0;

  let x = 0,
    y = 0;
  let minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0;

  for (const char of iterate(lsystem, iterations)) {
    if (char === "+") angle += lsystem.angle;
    else if (char === "-") angle -= lsystem.angle;
    else if (lsystem.draw.includes(char)) {
      const dx = Math.cos(angle) * length;
      const dy = Math.sin(angle) * length;
      path += ` l${dx} ${dy}`;

      x += dx;
      y += dy;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);

      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  return (
    <svg width={maxX - minX + 2 * margin} height={maxY - minY + 2 * margin}>
      <path
        d={`M${-minX + margin} ${-minY + margin} ${path}`}
        style={{
          fill: "none",
          stroke: stroke.color,
          strokeWidth: stroke.width,
        }}
        offset={10}
      />
    </svg>
  );
}
