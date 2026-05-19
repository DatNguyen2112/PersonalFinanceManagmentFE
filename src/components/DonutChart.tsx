interface Segment {
  value: number;
  color: string;
  label: string;
  percent?: number;
}

interface Props {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerSubLabel?: string;
}

export function DonutChart({
  segments,
  size = 160,
  strokeWidth = 24,
  centerLabel,
  centerSubLabel,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments?.reduce((s, seg) => s + seg.value, 0);

  if (total === 0 || !segments?.length) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>
    );
  }

  let currentOffset = 0;
  const arcs = segments?.map((seg) => {
    const pct =
      seg.percent !== undefined
        ? seg.percent
        : total > 0
          ? seg.value / total
          : 0;
    const dash = pct * circumference;
    const arc = { ...seg, dash, offset: currentOffset, pct };
    currentOffset += dash;
    return arc;
  });

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
        />
        {arcs?.map((arc, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
            strokeDashoffset={-arc.offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
        ))}
      </svg>
      {(centerLabel || centerSubLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerLabel && (
            <p className="text-slate-800 font-bold text-sm leading-tight">
              {centerLabel}
            </p>
          )}
          {centerSubLabel && (
            <p className="text-slate-400 text-xs mt-0.5">{centerSubLabel}</p>
          )}
        </div>
      )}
    </div>
  );
}
