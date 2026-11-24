import { createFileRoute } from "@tanstack/react-router";
import { ConfiguratorIndex } from "@/components/configurators-page";

export const Route=createFileRoute("/configurators/")({
  component:ConfiguratorIndex,
  head:()=>({
    meta:[
      {title:"Конфигураторы котельного оборудования — kotly.pro"},
      {name:"description",content:"Водогрейные и паровые котлы, термомасляные системы и блочно-модульные котельные. Связанные инженерные расчёты и предварительное ТЗ."},
    ],
    links:[{rel:"canonical",href:"https://kotly.pro/configurators/"}],
  }),
});
