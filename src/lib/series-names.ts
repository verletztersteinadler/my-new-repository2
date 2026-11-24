/**
 * Uniform, source-faithful series titles across all published catalogs.
 * Named product marks (METEOR/LaggarTT) are kept as published; other
 * bare series names gain the manufacturer's brand in presentation only.
 */
const alternativeProductMarks: Readonly<Record<string, readonly string[]>> = {
  "meteor thermo": ["METEOR", "LaggarTT"],
};

function normalizeSpaces(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

function startsWithMark(title: string, mark: string): boolean {
  if (title.slice(0, mark.length).toLocaleLowerCase("ru") !== mark.toLocaleLowerCase("ru")) return false;
  const boundary = title[mark.length];
  return boundary === undefined || /[\s,;:()\u2013\u2014/-]/u.test(boundary);
}

/** A complete maker brand or a verified alternative product trademark. */
export function seriesNameHasBrand(brand: string, seriesTitle: string): boolean {
  const maker = normalizeSpaces(brand);
  const title = normalizeSpaces(seriesTitle);
  if (!maker || !title) return false;
  const aliases = alternativeProductMarks[maker.toLocaleLowerCase("ru")] ?? [];
  return [maker, ...aliases].some((mark) => startsWithMark(title, mark));
}

/** Preserve source spelling and product codes; never invent model numbers. */
export function displaySeriesName(brand: string, sourceName: string): string {
  const maker = normalizeSpaces(brand);
  const title = normalizeSpaces(sourceName);
  if (!maker || !title) return title || maker;

  if (title.toLocaleLowerCase("ru") === maker.toLocaleLowerCase("ru")) {
    return maker + " — серия не указана";
  }
  if (seriesNameHasBrand(maker, title)) return title;

  const atEnd = title.slice(-maker.length).toLocaleLowerCase("ru") === maker.toLocaleLowerCase("ru") &&
    (title.length === maker.length || /[\s,;:()\u2013\u2014/-]/u.test(title[title.length - maker.length - 1]));
  if (atEnd) {
    const subject = title.slice(0, -maker.length).replace(/[\s,;:\u2013\u2014-]+$/u, "").trim();
    if (subject) return maker + " — " + subject;
  }
  return maker + " " + title;
}
