import manifest from "./image-manifest.json";

/**
 * Photographs are DENIED by default. A legacy Series.image is never a grant to
 * publish it as a model/series photo. Only explicitly verified manifest entries
 * are eligible, and only after source AND reuse rights are recorded.
 */
export type ImageStatus = "official-model" | "official-series" | "official-generic" | "placeholder";
export type SourceType = "website" | "pdf" | "catalog";
export type UsagePermission = "permission-granted" | "licensed" | "public-domain";

export type ImageEvidence = {
  status: ImageStatus;
  imagePath: string | null;
  sourceUrl: string | null;
  sourceType: SourceType | null;
  verifiedAt: string | null;
  usagePermission: UsagePermission | null;
  sourcePage?: number;
  fileHash?: string;
  note?: string;
};

export const IMAGE_PLACEHOLDER = "/catalog/placeholders/no-verified-image.svg";
export const imageRecords: Readonly<Record<string, ImageEvidence>> =
  manifest.records as Record<string, ImageEvidence>;

export function isPublishableEvidence(record: ImageEvidence | undefined): record is ImageEvidence {
  if (!record || record.status === "placeholder") return false;
  return (
    /^\/catalog\/verified\/[a-z0-9/_-]+\.(?:jpe?g|png|webp|avif)$/i.test(record.imagePath ?? "") &&
    /^https:\/\/[^\s/]+\//i.test(record.sourceUrl ?? "") &&
    ["website", "pdf", "catalog"].includes(record.sourceType ?? "") &&
    /^\d{4}-\d{2}-\d{2}$/.test(record.verifiedAt ?? "") &&
    ["permission-granted", "licensed", "public-domain"].includes(record.usagePermission ?? "")
  );
}

export function resolveSeriesImage(
  manufacturerSlug: string,
  series: { id: string; name: string },
): { src: string; alt: string; caption: string; status: ImageStatus } {
  const evidence = imageRecords[manufacturerSlug + "/" + series.id];
  if (!isPublishableEvidence(evidence)) {
    return {
      src: IMAGE_PLACEHOLDER,
      alt: "Официальное изображение серии " + series.name + " пока не подтверждено",
      caption: "Официальное изображение серии не подтверждено",
      status: "placeholder",
    };
  }
  const captions: Record<Exclude<ImageStatus, "placeholder">, string> = {
    "official-model": "Официальное изображение модели производителя",
    "official-series": "Официальное изображение серии производителя",
    "official-generic": "Общий официальный визуал производителя — не конкретная модель",
  };
  return {
    src: evidence.imagePath!,
    alt: "Изображение " + series.name + ", официальный материал производителя",
    caption: captions[evidence.status as Exclude<ImageStatus, "placeholder">],
    status: evidence.status,
  };
}
