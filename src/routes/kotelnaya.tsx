import { createFileRoute } from "@tanstack/react-router";
import { BoilerHouseBuilder } from "@/components/boiler-house-builder";

export const Route = createFileRoute("/kotelnaya")({
  component: BoilerHouseBuilder,
  head: () => ({
    meta: [
      { title: "Конструктор промышленной котельной — Котлы.pro" },
      { name: "description", content: "Сформировать техническое задание на промышленную котельную: водогрейные и паровые группы, резервирование, инженерные системы, выбор серий оборудования." },
    ],
  }),
});
