import { Link } from "@tanstack/react-router";
import { formatEngineeringNumber as fmt, temperatureCToK } from "@/lib/engineering-units";
import { pumpRoles, type PumpRoleId } from "@/data/pumps";
import {
  evaluatePumpGroup, flowToM3S, m3sToFlow, newPumpGroup, parsePumpValue,
  type PumpFlowUnit, type PumpGroup, type PumpControl, type PumpFrequency,
} from "@/lib/pump-engineering";
import type { PlantMode } from "@/lib/boiler-house";

const control="h-10 w-full min-w-0 rounded-xl border border-line bg-surface px-3 text-sm text-ink";
const roleRestriction: Partial<Record<PumpRoleId,"water"|"steam">> = {
  network:"water",circulation:"water",makeup:"water",
  feedwater:"steam",condensate:"steam",
};
export function validPumpRoles(mode: PlantMode) {
  return pumpRoles.filter((r)=>{
    const allowed=roleRestriction[r.id];
    return !allowed || mode==="combined" || mode===allowed;
  });
}
export function defaultPumpRoles(mode:PlantMode):PumpRoleId[] {
  if(mode==="steam")return ["feedwater","condensate"];
  if(mode==="combined")return ["network","makeup","feedwater","condensate"];
  return ["network","makeup"];
}
function NumberField({title,value,onChange,placeholder,hint}:{
  title:string;value:string;onChange:(value:string)=>void;placeholder?:string;hint?:string;
}) {
  return <label className="grid min-w-0 gap-1 text-xs font-semibold text-muted">
    {title}<input type="text" inputMode="decimal" className={control} value={value}
      onChange={(e)=>onChange(e.target.value)} placeholder={placeholder??"Уточнить"}/>
    {hint&&<small className="font-normal">{hint}</small>}
  </label>;
}
function Select<T extends string>({title,value,onChange,options}:{
  title:string;value:T;onChange:(v:T)=>void;options:{value:T;label:string}[];
}) {
  return <label className="grid min-w-0 gap-1 text-xs font-semibold text-muted">
    {title}<select className={control} value={value} onChange={(e)=>onChange(e.target.value as T)}>
      {options.map((v)=><option value={v.value} key={v.value}>{v.label}</option>)}
    </select>
  </label>;
}

export function PumpGroupsEditor({mode,groups,onChange}:{
  mode:PlantMode;groups:PumpGroup[];onChange:(v:PumpGroup[])=>void;
}) {
  const roles=validPumpRoles(mode);
  const visible=groups.filter((g)=>roles.some((r)=>r.id===g.role));
  const patch=(id:string,updates:Partial<PumpGroup>)=>
    onChange(groups.map((g)=>g.id===id?{...g,...updates}:g));
  function addGroup(){
    const next = Math.max(0,...groups.map((g)=>{
      const m=/^pump-(\d+)$/.exec(g.id);return m?Number(m[1]):0;
    }))+1;
    onChange([...groups,newPumpGroup(roles[0]?.id??"network","pump-"+next)]);
  }
  function changeFlowUnit(g:PumpGroup,next:PumpFlowUnit) {
    if(g.flowUnit===next)return;
    const n=parsePumpValue(g.totalFlow);
    patch(g.id,{flowUnit:next,totalFlow:n==null?g.totalFlow:fmt(m3sToFlow(flowToM3S(n,g.flowUnit),next),10)});
  }
  const updateRole=(g:PumpGroup,id:PumpRoleId)=>{
    const previousDefault=newPumpGroup(g.role,g.id).fluid;
    const newDefault=newPumpGroup(id,g.id).fluid;
    patch(g.id,{role:id,fluid:g.fluid===previousDefault?newDefault:g.fluid});
  };

  return <section className="mt-7 rounded-2xl border border-line bg-bg/30 p-4 sm:p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-accent">Насосный раздел котельной</p>
        <h3 className="mt-1 font-display text-xl font-extrabold">Насосные группы и рабочие точки</h3>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          Вводятся требования к системе, а не характеристики выбранной модели. Q — суммарный расход рабочей группы;
          H — требуемый напор каждого насоса. При параллельной работе расход делится между рабочими насосами, напор не делится.
        </p>
      </div>
      <button type="button" onClick={addGroup}
        className="h-10 rounded-xl bg-accent px-4 text-sm font-semibold text-on-accent">
        + Добавить группу
      </button>
    </div>
    <div className="mt-5 grid gap-4">
      {visible.map((g,index)=>{
        const role=pumpRoles.find((r)=>r.id===g.role);
        const info=evaluatePumpGroup(g);
        const temperature=parsePumpValue(g.tempC,true);
        const pressure=parsePumpValue(g.pressureMPa);
        const viscosity=parsePumpValue(g.viscosityMm2S);
        return <article key={g.id} className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-display text-lg font-extrabold">Группа {index+1}</h4>
            <button type="button" onClick={()=>onChange(groups.filter((v)=>v.id!==g.id))}
              className="text-xs font-semibold text-muted underline hover:text-accent">Удалить группу</button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Select title="Назначение" value={g.role} onChange={(v)=>updateRole(g,v)}
              options={roles.map((r)=>({value:r.id,label:r.name}))}/>
            <label className="grid gap-1 text-xs font-semibold text-muted">
              Рабочая среда
              <input className={control} maxLength={100} value={g.fluid}
                onChange={(e)=>patch(g.id,{fluid:e.target.value})}/>
            </label>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">{role?.purpose}. Обязательно для проверки модели: {role?.required}.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <NumberField title="Q — расход рабочей группы" value={g.totalFlow}
              onChange={(v)=>patch(g.id,{totalFlow:v})} placeholder="36"/>
            <Select title="Единицы расхода" value={g.flowUnit} onChange={(v)=>changeFlowUnit(g,v)}
              options={[
                {value:"m3/h",label:"м³/ч"},{value:"l/s",label:"л/с"},{value:"m3/s",label:"м³/с (СИ)"},
              ]}/>
            <NumberField title="H — напор, м" value={g.headM}
              onChange={(v)=>patch(g.id,{headM:v})} placeholder="25"/>
            <Select title="Рабочих насосов" value={String(g.dutyUnits)} onChange={(v)=>patch(g.id,{dutyUnits:Number(v)})}
              options={Array.from({length:8},(_,i)=>({value:String(i+1),label:String(i+1)+" шт."}))}/>
            <Select title="Резервных насосов" value={String(g.standbyUnits)} onChange={(v)=>patch(g.id,{standbyUnits:Number(v)})}
              options={Array.from({length:5},(_,i)=>({value:String(i),label:String(i)+" шт."}))}/>
            <Select title="Регулирование" value={g.control} onChange={(v)=>patch(g.id,{control:v})}
              options={[
                {value:"unknown",label:"Определить при проектировании"},{value:"fixed",label:"Без ЧРП"},
                {value:"vfd",label:"Частотное регулирование (ЧРП)"},
              ]}/>
            <NumberField title="Температура среды, °C" value={g.tempC}
              onChange={(v)=>patch(g.id,{tempC:v})} placeholder="95"/>
            <NumberField title="Рабочее давление, МПа" value={g.pressureMPa}
              onChange={(v)=>patch(g.id,{pressureMPa:v})} placeholder="0,6"/>
            <Select title="Сеть питания" value={g.frequency} onChange={(v)=>patch(g.id,{frequency:v})}
              options={[{value:"",label:"Уточнить"},{value:"50",label:"50 Гц"},{value:"60",label:"60 Гц"}]}/>
          </div>
          <details className="mt-4 rounded-xl border border-line bg-bg/30 p-3">
            <summary className="cursor-pointer text-sm font-bold">Расширенные гидравлические и физические параметры</summary>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <NumberField title="Плотность, кг/м³" value={g.densityKgM3} onChange={(v)=>patch(g.id,{densityKgM3:v})} placeholder="Уточнить по среде"/>
              <NumberField title="Кинематическая вязкость, мм²/с" value={g.viscosityMm2S} onChange={(v)=>patch(g.id,{viscosityMm2S:v})} placeholder="Уточнить"/>
              <NumberField title="Доступный NPSHa, м" value={g.npshaM} onChange={(v)=>patch(g.id,{npshaM:v})} placeholder="Требует расчёта"/>
            </div>
            <label className="mt-3 grid gap-1 text-xs font-semibold text-muted">
              Дополнительные условия: уплотнение, материал, DN, взрывозащита, диапазон регулирования
              <textarea rows={2} maxLength={350} className="w-full rounded-xl border border-line bg-surface p-3 text-sm font-normal"
                value={g.comments} onChange={(e)=>patch(g.id,{comments:e.target.value})}
                placeholder="Данные для запроса поставщику"/>
            </label>
          </details>
          <div className="mt-4 rounded-xl bg-chip p-3 text-xs leading-relaxed">
            <p><strong>СИ:</strong> Q группы = {info.totalM3S==null?"уточнить":fmt(info.totalM3S,8)+" м³/с"}; Q рабочего насоса = {info.perDutyM3S==null?"уточнить":fmt(info.perDutyM3S,8)+" м³/с"}; H = {info.headM==null?"уточнить":fmt(info.headM)+" м"}.</p>
            {temperature!=null&&<p className="mt-1">Температура: {fmt(temperatureCToK(temperature),4)} K.</p>}
            {pressure!=null&&<p className="mt-1">Давление: {fmt(pressure*1_000_000,4)} Па.</p>}
            {viscosity!=null&&<p className="mt-1">Вязкость: {fmt(viscosity/1_000_000,9)} м²/с.</p>}
            {info.hydraulicKw!=null&&<p className="mt-1"><strong>Полезная гидравлическая мощность:</strong> {fmt(info.hydraulicKw,5)} кВт для рабочих насосов; это не мощность электродвигателя.</p>}
            {info.unknowns.length>0&&<p className="mt-2 text-muted">Не указано (для уточнения): {info.unknowns.join(", ")}.</p>}
            {info.issues.length>0&&<p role="alert" className="mt-2 font-semibold text-accent">Проверить: {info.issues.join("; ")}.</p>}
            <p className="mt-2 text-muted">Без характеристической кривой Q–H, КПД и NPSHr изготовителя автоматический выбор конкретной модели недопустим.</p>
          </div>
        </article>;
      })}
    </div>
    <p className="mt-4 text-xs leading-relaxed text-muted">
      <Link to="/nasosy" className="font-semibold text-accent underline">Предварительный реестр насосных производителей</Link>
      {" · "} 25 компаний группы A без проверенных модельных Q–H характеристик.
      Указанные группы попадают в техническое задание; марки и типоразмеры уточняются после проверки паспортов.
    </p>
  </section>;
}
