import { resolveSeriesImage } from "@/data/image-evidence";
import type { Series } from "@/data/catalog";

type Props = {
  manufacturerSlug: string;
  series: Pick<Series, "id" | "name">;
  compact?: boolean;
  eager?: boolean;
  className?: string;
};

export function SeriesImage({ manufacturerSlug, series, compact = false, eager = false, className }: Props) {
  const evidence = resolveSeriesImage(manufacturerSlug, series);
  return (
    <figure className={compact ? "shrink-0" : "overflow-hidden"}>
      <img
        src={evidence.src}
        alt={evidence.alt}
        width={1600}
        height={900}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className ?? (compact ? "size-14 shrink-0 rounded-lg object-cover" : "aspect-video w-full object-cover")}
      />
      {!compact ? (
        <figcaption className="px-3 py-2 text-left text-xs leading-snug text-muted">
          {evidence.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
