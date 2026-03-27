import { type PortfolioTechnology } from "~/types/frontmatter";
import type { JSX } from "preact";
import { useState } from "preact/hooks";
import {
  getTechColor,
  hexToRgba,
} from "~/components/portfolio/technologyColors";

interface Props {
  data?: PortfolioTechnology[];
  className?: string;
}

const SLICE_GAP_PERCENT = 0.7;

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
) {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function describeDonutSlicePath(startPercent: number, endPercent: number) {
  const cx = 50;
  const cy = 50;
  const outerRadius = 50;
  const innerRadius = 32;

  const startAngle = (startPercent / 100) * 360;
  const endAngle = (endPercent / 100) * 360;
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

const TechnologiesUsed = ({ className, ...props }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const technologies = (props.data || [])
    .filter((item) => (item.value || 0) > 0)
    .map((item, index) => ({
      type: item.type || "OTHER",
      value: item.value || 0,
      color: getTechColor(item.type, index),
    }));

  const total = technologies.reduce((sum, tech) => sum + tech.value, 0);
  let running = 0;
  const slices = technologies.map((tech) => {
    const start = running;
    const percent = total > 0 ? (tech.value / total) * 100 : 0;
    running += percent;
    const end = running;
    return { ...tech, start, end, percent };
  });

  const gradientStops: string[] = slices.map((slice, index) => {
    const isActive = activeIndex === null || activeIndex === index;
    const color = isActive ? slice.color : hexToRgba(slice.color, 0.2);
    const start = slice.start;
    const end = slice.end;
    const innerStart = Math.min(start + SLICE_GAP_PERCENT / 2, end);
    const innerEnd = Math.max(end - SLICE_GAP_PERCENT / 2, start);

    return `transparent ${start}% ${innerStart}%, ${color} ${innerStart}% ${innerEnd}%, transparent ${innerEnd}% ${end}%`;
  });

  const activeSlice = activeIndex === null ? null : slices[activeIndex];
  const activeSliceGradient =
    activeSlice !== null
      ? `conic-gradient(transparent 0 ${Math.min(activeSlice.start + SLICE_GAP_PERCENT / 2, activeSlice.end)}%, ${activeSlice.color} ${Math.min(activeSlice.start + SLICE_GAP_PERCENT / 2, activeSlice.end)}% ${Math.max(activeSlice.end - SLICE_GAP_PERCENT / 2, activeSlice.start)}%, transparent ${Math.max(activeSlice.end - SLICE_GAP_PERCENT / 2, activeSlice.start)}% 100%)`
      : "none";

  const donutStyle: JSX.CSSProperties = {
    backgroundImage:
      gradientStops.length > 0
        ? `conic-gradient(${gradientStops.join(", ")})`
        : "linear-gradient(135deg, rgba(103,201,255,0.2), rgba(103,201,255,0.05))",
    boxShadow:
      activeSlice !== null
        ? `0 0 0 1px ${hexToRgba(activeSlice.color, 0.4)}, 0 0 16px ${hexToRgba(activeSlice.color, 0.18)}`
        : undefined,
  };

  return (
    <div className={className}>
      <h3 className="mb-6 font-headline text-2xl font-semibold text-on-surface md:text-4xl">
        Technologies Used
      </h3>

      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
        <div className="mx-auto">
          <div
            className="relative h-44 w-44 rounded-full border border-outline-variant/70 shadow-floating transition-all duration-300 ease-out"
            style={donutStyle}
            aria-hidden="true"
          >
            {activeSlice !== null && (
              <div
                className="pointer-events-none absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  backgroundImage: activeSliceGradient,
                  transform: "scale(1.045)",
                  boxShadow: `0 0 10px ${hexToRgba(activeSlice.color, 0.2)}`,
                }}
              />
            )}
            <div
              className="absolute inset-8 rounded-full border bg-surface-container-low transition-colors duration-300"
              style={{
                borderColor:
                  activeSlice !== null
                    ? hexToRgba(activeSlice.color, 0.7)
                    : undefined,
              }}
            />

            {/* Interactive ring hit areas so hovering pie slices mirrors legend hover */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              onMouseLeave={() => setActiveIndex(null)}
            >
              {slices.map((slice, index) => (
                <path
                  key={`${slice.type}-${index}`}
                  d={describeDonutSlicePath(slice.start, slice.end)}
                  fill="rgba(0, 0, 0, 0.001)"
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </svg>
          </div>
        </div>

        <ul className="space-y-2">
          {slices.map((tech, index) => {
            const percentage =
              total > 0 ? Math.round((tech.value / total) * 100) : 0;
            const isActive = activeIndex === index;
            return (
              <li
                key={tech.type}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant bg-surface-container-high px-3 py-2 transition-all duration-200 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low active:scale-[0.99]"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                style={{
                  backgroundColor: isActive
                    ? hexToRgba(tech.color, 0.12)
                    : undefined,
                  borderColor: isActive
                    ? hexToRgba(tech.color, 0.6)
                    : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: tech.color }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-on-surface">
                    {tech.type}
                  </span>
                </div>
                <span className="font-mono text-xs text-on-surface-muted">
                  {percentage}%
                </span>
              </li>
            );
          })}

          {technologies.length === 0 && (
            <li className="rounded-lg border border-outline-variant bg-surface-container-high px-3 py-2 text-sm text-on-surface-muted">
              No technology data available.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TechnologiesUsed;
