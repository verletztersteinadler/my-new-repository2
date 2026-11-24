import { createFileRoute,notFound } from "@tanstack/react-router";
import { ConfiguratorDetail,configuratorOptions } from "@/components/configurators-page";

export const Route=createFileRoute("/configurators/$kind")({
  loader:({params})=>{
    const entry=configuratorOptions.find(x=>x.id===params.kind);
    if(!entry)throw notFound();
    return entry;
  },
  component:()=>{
    const {kind}=Route.useParams();
    return <ConfiguratorDetail kind={kind as "water"|"steam"|"oil"|"modular"}/>;
  },
  head:({loaderData,params})=>({
    meta:[
      {title:(loaderData?.title??"Конфигуратор")+" — kotly.pro"},
      {name:"description",content:loaderData?.summary??"Инженерный конфигуратор."},
    ],
    links:[{rel:"canonical",href:"https://kotly.pro/configurators/"+encodeURIComponent(params.kind)+"/"}],
  }),
});
