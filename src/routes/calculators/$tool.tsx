import { createFileRoute, notFound } from "@tanstack/react-router";
import { CalculatorDetail } from "@/components/calculators-page";
import { calculatorById } from "@/lib/calculators";

export const Route = createFileRoute("/calculators/$tool")({
  loader: ({ params }) => {
    if (!calculatorById(params.tool)) throw notFound();
    return calculatorById(params.tool);
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: (loaderData?.title ?? "Инженерный калькулятор") + " — kotly.pro" },
      { name: "description", content: loaderData?.description ?? "Расчёт инженерных величин с формулами и проверками." },
    ],
    links: [{ rel: "canonical", href: "https://kotly.pro/calculators/" + encodeURIComponent(params.tool) + "/" }],
  }),
  component: () => {
    const { tool } = Route.useParams();
    return <CalculatorDetail tool={tool} />;
  },
});
