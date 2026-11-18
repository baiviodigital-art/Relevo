/** Banda horizontal infinita en CSS (sin JS). Se detiene con prefers-reduced-motion. */
export function Marquee({
  items,
  className = "",
  duration = 38,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={i} className="flex items-center">
          <span className="display px-6 md:px-10">{t}</span>
          <span className="text-scarlet" aria-hidden>
            ✶
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
