import { createFileRoute } from "@tanstack/react-router";
import { PumpDirectoryPage } from "@/components/pump-directory";

export const Route = createFileRoute("/nasosy")({
  component: PumpDirectoryPage,
  head: () => ({
    meta: [
      { title: "Насосы для промышленных котельных — kotly.pro" },
      { name: "robots", content: "noindex,follow" },
      { name: "description", content: "Исследовательский реестр производителей промышленных насосов: сетевые, питательные, конденсатные, подпиточные и другие. Характеристики моделей требуют проверки." },
    ],
  }),
});
