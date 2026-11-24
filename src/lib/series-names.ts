/**
 * One catalog naming convention, without inventing a manufacturer's official
 * model designation: "BRAND Series" or "BRAND — descriptive product group".
 *
 * Keeps original spelling, codes, punctuation and Cyrillic. Series IDs, sizes
 * and technical characteristics are never modified by this formatter.
 */
export function displaySeriesName(brand: string, sourceName: string): string {
  const maker = brand.trim().replace(/\s+/g, " ");
  const title = sourceName.trim().replace(/\s+/g, " ");
  if (!maker || !title) return title || maker;

  const same = (left: string, right: string) => left.toLocaleLowerCase("ru") === right.toLocaleLowerCase("ru");
  // A brand-only entry has no distinct published series designation.
  // Do not misrepresent the manufacturer name as an invented product line.
  if (same(title, maker)) return maker + " — серия не указана";

  // Some groups publish equipment under another verified trademark.
  // Keep an existing official product mark intact instead of coining
  // double-brand strings such as "METEOR Thermo METEOR C30".
  const alternativeProductMarks: Record<string, readonly string[]> = {
    "meteor thermo": ["METEOR", "LaggarTT"],
  };
  const marks = alternativeProductMarks[maker.toLocaleLowerCase("ru")] ?? [];
  if (marks.some((mark) =>
    same(title.slice(0, mark.length), mark) &&
    (title.length === mark.length || /[\\s,;:()\\u2013\\u2014/-]/u.test(title[mark.length]))
  )) return title;

  const startsWithMaker = same(title.slice(0, maker.length), maker) &&
    (title.length === maker.length || /[\s,;:()\u2013\u2014/-]/u.test(title[maker.length]));
  if (startsWithMaker) return title;

  const endsWithMaker = same(title.slice(-maker.length), maker) &&
    (title.length === maker.length || /[\s,;:()\u2013\u2014/-]/u.test(title[title.length - maker.length - 1]));
  if (endsWithMaker) {
    const subject = title.slice(0, -maker.length).replace(/[\s,;:\u2013\u2014-]+$/u, "").trim();
    if (subject) return maker + " — " + subject;
  }

  // "Reverse" -> "LAVART Reverse"; if this is an editorial category, the
  // original category name is preserved verbatim after the brand.
  return maker + " " + title;
}
