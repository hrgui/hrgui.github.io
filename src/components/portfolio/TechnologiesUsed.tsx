import { type PortfolioTechnology } from "~/types/frontmatter";
import type { JSX } from "preact";
import { useState } from "preact/hooks";
import { useTranslation } from "~/i18n/context";
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
  const { t } = useTranslation();
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
      <h3 className="mb-6 text-headline text-fg">
        {t("portfolio.technologiesUsed.heading")}
      </h3>

      {/* Donut and legend sit side by side when the cell is wide enough and
          wrap to a stack when it isn't, so they never overflow the cell. */}
      <div className="flex flex-wrap items-center gap-x-10 gap-y-8">
        <div className="mx-auto shrink-0 sm:mx-0">
          <div
            className="relative h-44 w-44 rounded-full transition-all duration-300 ease-out"
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
              className="absolute inset-8 rounded-full border border-solid border-border-muted bg-frame-bg transition-colors duration-300"
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

        <ul className="min-w-[13rem] flex-1 border-t border-t-solid border-grid-line">
          {slices.map((tech, index) => {
            const percentage =
              total > 0 ? Math.round((tech.value / total) * 100) : 0;
            const isActive = activeIndex === index;
            return (
              <li
                key={tech.type}
                className="flex cursor-pointer items-center justify-between gap-4 border-b border-b-solid border-grid-line px-2 py-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                style={{
                  backgroundColor: isActive
                    ? hexToRgba(tech.color, 0.12)
                    : undefined,
                }}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: tech.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-fg">
                    {tech.type}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-xs tabular-nums text-fg-muted">
                  {percentage}%
                </span>
              </li>
            );
          })}

          {technologies.length === 0 && (
            <li className="border-b border-b-solid border-grid-line px-2 py-2.5 text-sm text-fg-muted">
              {t("portfolio.technologiesUsed.empty")}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TechnologiesUsed;
