import { createFileRoute } from "@tanstack/react-router";
import { CalculatorsIndex } from "@/components/calculators-page";

const title = "Инженерные калькуляторы онлайн — 52 расчёта | kotly.pro";
const description = "52 инженерных калькулятора онлайн: расчёт мощности котла, расхода пара и газа, насосов, гидравлики, топлива и перевод единиц. Формулы и примеры.";

export const Route = createFileRoute("/calculators/")({
  component: CalculatorsIndex,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://kotly.pro/calculators/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://kotly.pro/calculators/" }],
  }),
});
