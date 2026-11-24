import { createFileRoute } from "@tanstack/react-router";
import { BoilerHouseBuilder } from "@/components/boiler-house-builder";

export const Route = createFileRoute("/kotelnaya")({
  component: BoilerHouseBuilder,
  head: () => ({
    meta: [
      { title: "Промышленная котельная под ключ — подбор, комплектация и запрос КП | kotly.pro" },
      { name: "description", content: "Предварительный инженерный подбор котельной для закупки: тепловая нагрузка, резервирование, водогрейные и паровые котлы, насосы, автоматика, состав комплектации и запрос КП." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://kotly.pro/kotelnaya" }],
  }),
});
