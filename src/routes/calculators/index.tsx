import { createFileRoute } from "@tanstack/react-router";
import { CalculatorsIndex } from "@/components/calculators-page";

export const Route = createFileRoute("/calculators/")({
  component: CalculatorsIndex,
  head: () => ({
    meta: [
      { title: "Инженерные калькуляторы и конвертеры — kotly.pro" },
      { name: "description", content: "16 бесплатных инженерных инструментов: вода, пар IAPWS-IF97, топливо, гидравлика, единицы давления, мощности и расхода." },
    ],
    links: [{ rel: "canonical", href: "https://kotly.pro/calculators/" }],
  }),
});
