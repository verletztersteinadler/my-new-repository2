import { createFileRoute, notFound } from "@tanstack/react-router";
import { CalculatorDetail } from "@/components/calculators-page";
import { calculatorById } from "@/lib/calculators";

export const Route = createFileRoute("/calculators/$tool")({
  loader: ({ params }) => {
    if (!calculatorById(params.tool)) throw notFound();
    return calculatorById(params.tool);
  },
  head: ({ loaderData, params }) => {
    const title = (loaderData?.title ?? "Инженерный калькулятор") + " онлайн — формула и расчёт | kotly.pro";
    const description = loaderData
      ? loaderData.description + " Формула: " + loaderData.formula + ". Бесплатный онлайн-калькулятор."
      : "Инженерный расчёт онлайн с формулами и проверкой исходных данных.";
    const url = "https://kotly.pro/calculators/" + encodeURIComponent(params.tool) + "/";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 210) },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 210) },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: () => {
    const { tool } = Route.useParams();
    return <CalculatorDetail tool={tool} />;
  },
});
