import assert from "node:assert/strict";
import { test } from "node:test";
import { calculatorDefinitions, calculate, initialInputs } from "./calculators.ts";
const run=(id:string,fields:Record<string,string>={})=>calculate(id,{...initialInputs(id),...fields});
const out=(id:string,label:string,fields:Record<string,string>={})=>{
  const found=run(id,fields).rows.find(row=>row.label===label);
  assert.ok(found,id+": "+label);
  return found.value;
};
const close=(v:number,expected:number,tolerance:number)=>assert.ok(Math.abs(v-expected)<=tolerance,
  "expected "+expected+"±"+tolerance+", received "+v);
test("All sections in the engineering brief are implemented without duplicate IDs",()=>{
  assert.equal(calculatorDefinitions.length,52);
  const count:Record<string,number>={};
  for(const item of calculatorDefinitions)count[item.group]=(count[item.group]??0)+1;
  assert.deepEqual(count,{
    "Конвертеры":8,"Водогрейные котлы":6,"Паровые котлы":10,
    "Топливо":7,"Гидравлика":8,"Термомасляные системы":5,
    "Дополнительные расчёты":8,
  });
});
test("Fuel heat value keeps LHV/HHV distinction and no invented conversion to mass",()=>{
  close(out("heating-value","Теплота сгорания",{value:"34.2",unit:"MJ"}),34.2,1e-12);
  close(run("heating-value").rows[1].value,9.5,1e-9);
});
test("DHW power, mixing and tank heating follow energy balance",()=>{
  close(out("dhw-power","Полезная мощность нагрева"),290.75,0.1);
  close(out("mixing","Горячий поток"),50,1e-12);
  close(out("tank-heating","Время нагрева"),6.395,0.1);
  assert.throws(()=>run("mixing",{mixed:"100"}),/между горячей и холодной/);
});
test("Steam process, flash fraction and blowdown use physical equations",()=>{
  close(out("process-steam","Расход пара"),917,35);
  const flash=out("flash-steam","Массовая доля вторичного пара");
  assert.ok(flash>10&&flash<20,"Flash fraction must be physically plausible");
  close(out("blowdown","Расход продувки"),1000*.05/.95,1e-8);
  assert.throws(()=>run("flash-steam",{p1:"1",p2:"10"}),/превышать/);
});
test("Fuel comparison, season volume and tank autonomy use explicit efficiencies",()=>{
  close(out("fuel-cost","Газ: стоимость 1 кВт·ч полезного тепла"),8/(9.5*.93),1e-6);
  close(out("tank-autonomy","Автономность"),80,1e-8);
  close(out("season-fuel","Расход топлива за сезон"),1000*.5*4000/(.93*9.5),1e-6);
});
test("Darcy losses and pump head/power preserve SI dimensions",()=>{
  const pressureLoss = run("pipe-loss").rows.find(row=>row.label==="Потери давления"&&row.unit==="кПа");
  assert.ok(pressureLoss, "Missing pipe pressure loss in kPa");
  const dp=pressureLoss.value;
  assert.ok(dp>0 && dp<1000,"Expected engineering-scale friction losses in kPa");
  close(out("pump-head","Напор для компенсации потерь"),100000/(1000*9.80665),1e-8);
  close(out("pump-power","Потребляемая мощность"),1000*9.80665*40*20/(3.6e6*.7),1e-7);
  assert.ok(out("oil-pipe-loss","Потери давления")>0);
  assert.throws(()=>run("pipe-loss",{diameter:"0"}),/больше нуля/);
});
test("Kv/Cv and heat exchanger LMTD use documented geometry",()=>{
  close(out("kv-cv","Пропускная способность Kv"),10,1e-9);
  close(out("kv-cv","Эквивалент Cv"),11.56099,1e-7);
  const delta=(30-20)/Math.log(30/20);
  close(out("heat-exchanger","Предварительная площадь теплообмена"),500000/(2000*delta),1e-6);
  assert.throws(()=>run("heat-exchanger",{hotIn:"40"}),/температурный напор|должна охлаждаться/);
});
test("Thermal oil calculators keep properties explicit and avoid inventing certified brands",()=>{
  close(out("oil-power","Полезная мощность"),20*820*2.2*50/3600,1e-9);
  close(out("oil-flow","Объёмный расход масла"),3600*500/(820*2.2*50),1e-9);
  close(out("oil-expansion","Изменение объёма"),10*(850/760-1),1e-9);
  assert.match(run("oil-heating").notes.join(" "),/Cp\(T\)/);
});
test("N+1 boiler count, pipe heat loss, savings and instrument signals",()=>{
  close(out("boiler-count","Рабочих котлов"),3,1e-9);
  close(out("boiler-count","Резервных котлов"),1,1e-9);
  assert.ok(out("pipe-heat-loss","Теплопроводные потери")>0);
  assert.ok(out("fuel-savings","Годовая экономия топлива")>0);
  close(out("signal-420ma","Физическая величина"),5,1e-12);
  close(out("signal-420ma","Электрический сигнал",{direction:"reverse",value:"5"}),12,1e-12);
});
test("Flue diameter and combustion-air estimates explicitly avoid full safety design",()=>{
  close(out("combustion-air","Фактический расход сухого воздуха"),100*9.52*1.15,1e-8);
  assert.ok(out("flue-diameter","Расчётный внутренний диаметр дымохода")>250);
  assert.match(run("flue-diameter").notes.join(" "),/не рассчитываются/);
});
