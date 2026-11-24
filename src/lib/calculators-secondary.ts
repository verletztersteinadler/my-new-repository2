/**
 * Second-queue engineering tools, sections 1.7–7.8 of the 23.11.2026 TZ.
 *
 * Thermo-oil and fuel properties are always explicit user inputs, never
 * fictional manufacturer curves. IF97 is used for steam/water states.
 * Preliminary estimates do not substitute regulated engineering design.
 */
import { solvePT, solvePx } from "iapws-if97";
import type { CalResult, CalRow } from "./calculators";

const g=9.80665;
const output=(label:string,value:number,unit:string,digits=4):CalRow=>{
  if(!Number.isFinite(value))throw new Error(label+": нечисловой результат");
  return {label,value,unit,digits};
};
const n=(input:Record<string,string>,key:string,min=-Infinity,max=Infinity)=>{
  const raw=input[key];
  if(raw==null||raw.trim()==="")throw new Error("Заполните поле «"+key+"»");
  const v=raw.replace(/[\u00a0\u202f ]/g,"").replace(",",".");
  if(!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(v))throw new Error("В поле «"+key+"» ожидается число");
  const x=Number(v);
  if(!Number.isFinite(x)||x<min||x>max)throw new Error("Значение «"+key+"» вне допустимого диапазона");
  return x;
};
const p=(input:Record<string,string>,key:string)=>{
  const x=n(input,key,0);
  if(x<=0)throw new Error("Поле «"+key+"» должно быть больше нуля");
  return x;
};
const eta=(input:Record<string,string>,key="eff")=>n(input,key,0.01,100)/100;
const tdiff=(input:Record<string,string>,hot:string,cold:string)=>{
  const d=n(input,hot,-273.15)-n(input,cold,-273.15);
  if(d<=0)throw new Error("Тёплая среда должна иметь температуру выше холодной");
  return d;
};
const saturation=(pressureBar:number)=>{
  if(pressureBar<0.00611657||pressureBar>=220.64)throw new Error("Для насыщенного пара требуется абсолютное давление от тройной до критической точки");
  return {steam:solvePx(pressureBar/10,1),water:solvePx(pressureBar/10,0)};
};
const submergedWater=(pressureBar:number,tempC:number)=>{
  const sat=saturation(pressureBar);
  if(tempC+273.15>=sat.steam.temperature)throw new Error("Температура конденсата/воды должна быть ниже температуры насыщения");
  return solvePT(pressureBar/10,tempC+273.15);
};
const expand=(volume:number,rho0:number,rho1:number)=>{
  const result=volume*(rho0/rho1-1);
  return [output("Изменение объёма",result,"м³"),output("Изменение объёма",result*1000,"л"),
    output("Относительное расширение",result/volume*100,"%")];
};
function pipeLoss(input:Record<string,string>):CalResult {
  const flow=n(input,"flow",0),diameter=p(input,"diameter")/1000,
    length=n(input,"length",0),roughness=n(input,"roughness",0)/1000,
    rho=p(input,"rho"),mu=p(input,"viscosity"),xi=n(input,"xi",0);
  const w=4*(flow/3600)/(Math.PI*diameter*diameter);
  if(w===0)return {rows:[
    output("Скорость потока",0,"м/с"),output("Потери давления",0,"кПа"),output("Напор",0,"м"),
  ],notes:["Нулевой расход: потери на этом режиме не определяют расчётную рабочую точку."]};
  const re=rho*w*diameter/mu;
  const laminar=re<2300;
  const transitional=re>=2300&&re<=4000;
  const lambda=laminar?64/re:Math.pow(-1.8*Math.log10(Math.pow(roughness/diameter/3.7,1.11)+6.9/re),-2);
  const delta=(lambda*length/diameter+xi)*rho*w*w/2;
  const notes=["Дарси—Вейсбах, λ по "+(laminar?"64/Re (ламинарное течение)":"Хааланду (приближение турбулентной зоны)")+"."];
  if(transitional)notes.push("Re в переходной зоне: результат λ ненадёжен, требуется дополнительная проверка.");
  return {rows:[
    output("Скорость потока",w,"м/с"),
    output("Число Рейнольдса",re,"—",1),
    output("Коэффициент трения λ",lambda,"—",6),
    output("Потери давления",delta,"Па",2),
    output("Потери давления",delta/1000,"кПа"),
    output("Потери давления",delta/1e5,"бар",6),
    output("Эквивалентный напор",delta/(rho*g),"м")],
  notes,selection:{flowM3h:flow}};
}
export function calculateSecondary(id:string,input:Record<string,string>):CalResult {
  switch(id){
    case "heating-value":{
      const v=n(input,"value",0);
      const unit=input.unit;
      const basis=input.basis==="m3"?"норм. м³":"кг";
      const kind=input.kind==="HHV"?"ВТС":"НТС";
      if(!["MJ","kWh","kcal"].includes(unit))throw new Error("Неверная единица теплоты");
      const mj=unit==="MJ"?v:unit==="kWh"?v*3.6:v*4184/1e6;
      return {rows:[output("Теплота сгорания",mj,"МДж/"+basis),
        output("Теплота сгорания",mj/3.6,"кВт·ч/"+basis),
        output("Теплота сгорания",mj*1e6/4184,"ккал/"+basis)],
        notes:[kind+": все величины приведены к одной выбранной основе. Пересчёт НТС↔ВТС требует состава топлива."]};
    }
    case "pipe-size":{
      const od=p(input,"outer"),wall=p(input,"wall");
      if(2*wall>=od)throw new Error("Две толщины стенки должны быть меньше наружного диаметра");
      return {rows:[output("Внутренний диаметр",od-2*wall,"мм"),
        output("Наружный диаметр",od,"мм"),
        output("Наружный диаметр",od/25.4,"дюйм"),
        output("Площадь живого сечения",Math.PI*Math.pow((od-2*wall)/1000,2)/4,"м²",6)],
        notes:["Обозначение DN/NPS и допуски стенки нужно сверить с выбранным сортаментом; DN ≠ точному внутреннему диаметру."]};
    }
    case "dhw-power":{
      const flow=n(input,"flow",0),delta=tdiff(input,"hot","cold"),rho=p(input,"rho"),cp=p(input,"cp");
      const kw=flow*rho*cp*delta/3600;
      return {rows:[output("Полезная мощность нагрева",kw,"кВт"),
        output("Мощность нагрева",kw/1000,"МВт"),output("Разность температур",delta,"K")],
        notes:["Расчёт по вручную введённым свойствам воды; пиковая нагрузка и накопление ГВС не учтены."],
        selection:{powerKw:kw,flowM3h:flow}};
    }
    case "tank-heating":{
      const volume=p(input,"volume"),rho=p(input,"rho"),cp=p(input,"cp"),
        delta=tdiff(input,"final","initial"),power=p(input,"power"),eff=eta(input);
      const hours=volume*rho*cp*delta/(3600*power*eff);
      return {rows:[output("Время нагрева",hours,"ч"),
        output("Время нагрева",hours*60,"мин"),
        output("Требуемая полезная теплота",volume*rho*cp*delta/3600,"кВт·ч")],
        notes:["Без потерь излучения, конвекции и теплоёмкости оборудования."]};
    }
    case "building-load":{
      const delta=tdiff(input,"inside","outside");
      const wall=n(input,"walls",0)*n(input,"uwalls",0);
      const win=n(input,"windows",0)*n(input,"uwindows",0);
      const roof=n(input,"roof",0)*n(input,"uroof",0);
      const vent=n(input,"vent",0),trans=(wall+win+roof)*delta/1000;
      return {rows:[output("Трансмиссионные теплопотери",trans,"кВт"),
        output("Нагрузка вентиляции",vent,"кВт"),
        output("Ориентировочная нагрузка",trans+vent,"кВт"),
        output("Разность температур",delta,"К")],
        notes:["Только 3 группы ограждений и вручную указанная вентиляционная составляющая."],
        selection:{powerKw:trans+vent}};
    }
    case "mixing":{
      const cold=n(input,"cold",-273.15),hot=n(input,"hot",-273.15),
        mix=n(input,"mixed",-273.15),flow=n(input,"flow",0);
      if(hot<=cold||mix<cold||mix>hot)throw new Error("Температура смеси должна лежать между горячей и холодной");
      const hotFlow=flow*(mix-cold)/(hot-cold);
      return {rows:[output("Горячий поток",hotFlow,"м³/ч"),
        output("Холодный поток",flow-hotFlow,"м³/ч"),
        output("Доля горячего потока",flow>0?hotFlow/flow*100:0,"%")],
        notes:["Равные теплоёмкости потоков; для разных сред применяют энтальпийный баланс."],
        selection:{flowM3h:flow}};
    }
    case "process-steam":{
      const pressure=p(input,"pressure"),sat=saturation(pressure),
        condensate=n(input,"condensate",0,350);
      const hc=submergedWater(pressure,condensate).enthalpy;
      const power=n(input,"power",0),delta=sat.steam.enthalpy-hc;
      if(delta<=0)throw new Error("Энтальпийный перепад должен быть положительным");
      const kg=3600*power/delta;
      return {rows:[output("Расход пара",kg,"кг/ч"),
        output("Паропотребление",kg/1000,"т/ч"),
        output("Энтальпия пара",sat.steam.enthalpy,"кДж/кг"),
        output("Энтальпия конденсата",hc,"кДж/кг"),
        output("Перепад энтальпий",delta,"кДж/кг")],
        notes:["Пар сухой насыщенный, свойства IF97. Не учтены потери пара и теплообмена."],
        selection:{steamKgH:kg,powerKw:power}};
    }
    case "steam-pipe":{
      const kg=p(input,"steam")*1000,sat=saturation(p(input,"pressure"));
      const w=p(input,"speed"),d=Math.sqrt(4*kg*sat.steam.specificVolume/(3600*Math.PI*w));
      return {rows:[output("Расчётный внутренний диаметр",d*1000,"мм"),
        output("Удельный объём пара",sat.steam.specificVolume,"м³/кг",6),
        output("Объёмный расход пара",kg*sat.steam.specificVolume,"м³/ч"),
        output("Скорость",w,"м/с")],
        notes:["Потери на длине "+n(input,"length",0)+" м НЕ вычислены. Нужна отдельная проверка паропровода по перепаду давления и влажности."],
        selection:{steamKgH:kg}};
    }
    case "steam-quality":{
      const sat=saturation(p(input,"pressure")),x=n(input,"quality",0,1),flow=n(input,"flow",0);
      const h=sat.water.enthalpy+x*(sat.steam.enthalpy-sat.water.enthalpy);
      return {rows:[output("Энтальпия влажного пара",h,"кДж/кг"),
        output("Степень сухости",x*100,"%"),
        output("Масса паровой фазы",flow*x,"кг/ч"),
        output("Масса жидкой фазы",flow*(1-x),"кг/ч"),
        output("Тепловой поток относительно hf",flow*(h-sat.water.enthalpy)/3600,"кВт")],
        notes:["Массовая доля сухого пара x, свойства насыщения IF97."]};
    }
    case "flash-steam":{
      const p1=p(input,"p1"),p2=p(input,"p2"),flow=n(input,"condensate",0);
      if(p1<=p2)throw new Error("Начальное абсолютное давление должно превышать конечное");
      const a=saturation(p1),b=saturation(p2),hfg=b.steam.enthalpy-b.water.enthalpy;
      const x=(a.water.enthalpy-b.water.enthalpy)/hfg;
      if(x<0||x>1)throw new Error("Условия не соответствуют модельному диапазону дросселирования");
      return {rows:[output("Массовая доля вторичного пара",x*100,"%"),
        output("Расход вторичного пара",flow*x,"кг/ч"),
        output("Оставшийся жидкий конденсат",flow*(1-x),"кг/ч"),
        output("Теплота парообразования при конечном давлении",hfg,"кДж/кг")],
        notes:["Изоэнтальпийное дросселирование насыщенного конденсата. IF97; баланс теплопотерь не учитывается."]};
    }
    case "blowdown":{
      const steam=n(input,"steam",0),b=n(input,"percent",0,99.999)/100,
        blow=steam*b/(1-b);
      return {rows:[output("Расход продувки",blow,"кг/ч"),
        output("Расход питательной воды",steam+blow,"кг/ч"),
        output("Продувка",b*100,"% от питательной воды")],
        notes:["b — доля продувки от ОБЩЕГО расхода питательной воды. Нельзя путать с долей от расхода пара."],
        selection:{steamKgH:steam}};
    }
    case "steam-cost":{
      const pressure=p(input,"pressure"),sat=saturation(pressure),
        feed=n(input,"feed",0,350),fw=submergedWater(pressure,feed),
        hu=p(input,"hu"),eff=eta(input),fuelPrice=n(input,"fuelPrice",0),
        waterCost=n(input,"waterCost",0),electricCost=n(input,"electricCost",0);
      const qKwhPerTon=(sat.steam.enthalpy-fw.enthalpy)/3.6;
      const fuelPerTon=qKwhPerTon/(eff*hu);
      return {rows:[output("Тепло на 1 тонну пара",qKwhPerTon,"кВт·ч/т"),
        output("Расход топлива на тонну пара",fuelPerTon,"ед./т"),
        output("Затраты на топливо",fuelPerTon*fuelPrice,"руб/т"),
        output("Полная ориентировочная стоимость",fuelPerTon*fuelPrice+waterCost+electricCost,"руб/т")],
        notes:["НТС в кВт·ч на выбранную единицу. Не учтены продувка и потери конденсата; вода и электричество введены отдельными руб/т."]};
    }
    case "lpg-consumption":{
      const kw=p(input,"power"),eff=eta(input),hu=p(input,"hu"),density=p(input,"density"),
        load=n(input,"load",0,100)/100,hours=n(input,"hours",0,24);
      const mass=kw*load/(eff*hu);
      return {rows:[output("Расход СУГ",mass,"кг/ч"),
        output("Объём жидкой фазы",mass/density,"л/ч"),
        output("Расход за сутки",mass*hours,"кг"),
        output("Полезная тепловая нагрузка",kw*load,"кВт")],
        notes:["Расход относится к жидкой фазе только при заданной плотности; расчёт паровой фазы/испарителя требует других свойств."],
        selection:{powerKw:kw*load}};
    }
    case "fuel-cost":{
      const power=n(input,"power",0),hours=n(input,"hours",0);
      const opts=[
        ["Газ",p(input,"gasPrice"),p(input,"gasHu"),eta(input,"gasEff")],
        ["Дизель",p(input,"dieselPrice"),p(input,"dieselHu"),eta(input,"dieselEff")],
        ["СУГ",p(input,"lpgPrice"),p(input,"lpgHu"),eta(input,"lpgEff")],
        ["Электричество",p(input,"electricPrice"),1,eta(input,"electricEff")],
      ] as const;
      const cost=opts.map(([name,price,hu,eff])=>({name,c:price/(hu*eff)}));
      const cheapest=cost.reduce((a,b)=>a.c<b.c?a:b);
      return {rows:cost.flatMap(row=>[
        output(row.name+": стоимость 1 кВт·ч полезного тепла",row.c,"руб/кВт·ч",5),
        output(row.name+": годовая оценка",row.c*power*hours,"руб")]),
      notes:["Самый низкий указанный расходный тариф: "+cheapest.name+". Цены — только введённые допущения; инфраструктурные затраты не включены."],
      selection:{powerKw:power}};
    }
    case "season-fuel":{
      const power=n(input,"power",0),load=n(input,"load",0,100)/100,
        hours=n(input,"hours",0,8784),eff=eta(input),hu=p(input,"hu"),price=n(input,"price",0);
      const quantity=power*load*hours/(eff*hu);
      return {rows:[output("Расход топлива за сезон",quantity,"ед."),
        output("Расходы на топливо",quantity*price,"руб"),
        output("Полезная выработка",power*load*hours,"кВт·ч"),
        output("Средняя полезная нагрузка",power*load,"кВт")],
        notes:["Использован средний коэффициент загрузки и единый средневзвешенный КПД; при сложном графике применяют интервалы."]};
    }
    case "tank-autonomy":{
      const volume=p(input,"volume"),usable=n(input,"usable",0.001,100)/100,
        v=p(input,"consumption"),target=p(input,"target");
      return {rows:[output("Полезный объём",volume*usable,"л"),
        output("Автономность",volume*usable/v,"ч"),
        output("Автономность",volume*usable/v/24,"сут"),
        output("Минимальный полный объём на целевой период",v*target/usable,"л")],
        notes:["Технический и аварийный запас топлива требуется учесть отдельно."]};
    }
    case "gas-normal":{
      const normal=n(input,"normal",0),tn=n(input,"tn",-273.14)+273.15,
        tw=n(input,"tw",-273.14)+273.15,
        pn=p(input,"pn"),pw=p(input,"pw"),zn=p(input,"zn"),zw=p(input,"zw");
      const work=normal*(tw/tn)*(pn/pw)*(zw/zn);
      return {rows:[output("Расход при рабочих условиях",work,"м³/ч"),
        output("Нормальный расход",normal,"норм. м³/ч"),
        output("Коэффициент объёмного пересчёта",normal>0?work/normal:(tw/tn)*(pn/pw)*(zw/zn),"—",6)],
        notes:["Используются абсолютные давления и температуры в K. Z из ввода, реальная сжимаемость не моделируется."]};
    }
    case "pipe-loss":return pipeLoss(input);
    case "pump-head":{
      const loss=n(input,"loss",0),rho=p(input,"rho"),staticHead=n(input,"static",0);
      const isOpen=input.circuit==="open",h=loss*1000/(rho*g);
      return {rows:[output("Напор для компенсации потерь",h,"м"),
        output("Статический напор",isOpen?staticHead:0,"м"),
        output("Предварительный суммарный напор",h+(isOpen?staticHead:0),"м")],
        notes:[isOpen?"Открытая система: заданный статический подъём добавлен.":"Замкнутая система: статическая высота не добавляется."],
        selection:{}};
    }
    case "pump-power":{
      const flow=n(input,"flow",0),head=n(input,"head",0),rho=p(input,"rho"),
        eff=eta(input),hours=n(input,"hours",0,8784);
      const hyd=rho*g*flow*head/3.6e6;
      return {rows:[output("Гидравлическая мощность",hyd,"кВт"),
        output("Потребляемая мощность",hyd/eff,"кВт"),
        output("Потребление за период",hyd/eff*hours,"кВт·ч")],
        notes:["Используется суммарный КПД в заданной точке; номинал двигателя и NPSH требуют паспортного подбора."],
        selection:{flowM3h:flow}};
    }
    case "kv-cv":{
      const flow=n(input,"flow",0),dp=p(input,"dp"),rho=p(input,"rho");
      const kv=flow*Math.sqrt(rho/1000/dp);
      return {rows:[output("Пропускная способность Kv",kv,"м³/ч при ΔP=1 бар"),
        output("Эквивалент Cv",kv*1.156099,"US gal/min при ΔP=1 psi")],
        notes:["Для несжимаемой жидкости без кавитации. Производитель клапана проверяет характеристику и диапазон регулирования."]};
    }
    case "heat-exchanger":{
      const power=n(input,"power",0),hotIn=n(input,"hotIn",-273.15),hotOut=n(input,"hotOut",-273.15),
        coldIn=n(input,"coldIn",-273.15),coldOut=n(input,"coldOut",-273.15),
        u=p(input,"u"),factor=n(input,"f",0.001,1);
      if(hotIn<=hotOut||coldOut<=coldIn)throw new Error("Горячая среда должна охлаждаться, холодная — нагреваться");
      const dt1=hotIn-coldOut,dt2=hotOut-coldIn;
      if(dt1<=0||dt2<=0)throw new Error("Для заданного противотока нарушен положительный температурный напор");
      const lmtd=Math.abs(dt1-dt2)<1e-9?dt1:(dt1-dt2)/Math.log(dt1/dt2);
      const area=power*1000/(u*factor*lmtd);
      return {rows:[output("Среднелогарифмический температурный напор",lmtd,"K"),
        output("Предварительная площадь теплообмена",area,"м²"),
        output("Температурная разность на конце 1",dt1,"K"),
        output("Температурная разность на конце 2",dt2,"K")],
        notes:["Принята схема противотока. U и F — заданные, не определены по модели. Не учитывает гидравлический перепад."],
        selection:{powerKw:power}};
    }
    case "water-expansion":
    case "oil-expansion":{
      const volume=p(input,"volume"),rho0=p(input,"rho0"),rho1=p(input,"rho1");
      return {rows:expand(volume,rho0,rho1),
        notes:["Плотности должны соответствовать начальной и конечной температурам. Размер бака по этому результату автоматически не назначается."]};
    }
    case "oil-power":{
      const flow=n(input,"flow",0),delta=tdiff(input,"supply","return"),
        rho=p(input,"rho"),cp=p(input,"cp"),kw=flow*rho*cp*delta/3600;
      return {rows:[output("Полезная мощность",kw,"кВт"),output("Мощность",kw/1000,"МВт"),
        output("Массовый расход термомасла",flow*rho,"кг/ч")],
        notes:["ρ и Cp — только пользовательские свойства конкретной марки масла при рабочей температуре."],
        selection:{powerKw:kw,flowM3h:flow}};
    }
    case "oil-flow":{
      const power=n(input,"power",0),rho=p(input,"rho"),cp=p(input,"cp"),
        delta=tdiff(input,"supply","return"),flow=3600*power/(rho*cp*delta);
      return {rows:[output("Объёмный расход масла",flow,"м³/ч"),
        output("Массовый расход масла",flow*rho,"кг/ч"),output("Разность температур",delta,"К")],
        notes:["ρ и Cp должны соответствовать конкретной марке масла по производителю."],
        selection:{powerKw:power,flowM3h:flow}};
    }
    case "oil-pipe-loss":return pipeLoss(input);
    case "oil-heating":{
      const volume=p(input,"volume"),rho=p(input,"rho"),cp=p(input,"cp"),
        delta=tdiff(input,"final","initial"),power=p(input,"power"),eff=eta(input);
      const hours=volume*rho*cp*delta/(3600*power*eff);
      return {rows:[output("Время нагрева",hours,"ч"),
        output("Время нагрева",hours*60,"мин"),
        output("Теплота нагрева без потерь",volume*rho*cp*delta/3600,"кВт·ч")],
        notes:["Параметры масла при средней температуре заданы вручную, Cp(T) и теплоёмкость металла не интегрируются."]};
    }
    case "boiler-count":{
      const load=n(input,"load",0),unit=p(input,"unit"),alpha=eta(input,"maxLoad");
      const count=Math.ceil(load/(unit*alpha)),backup=input.reserve==="n+1"?1:0;
      return {rows:[output("Рабочих котлов",count,"шт",0),
        output("Резервных котлов",backup,"шт",0),
        output("Всего котлов",count+backup,"шт",0),
        output("Установленная номинальная мощность",(count+backup)*unit,"кВт"),
        output("Доля нагрузки одного рабочего котла",count>0?load/(count*unit)*100:0,"%")],
        notes:["Один дополнительный котёл N+1 не всегда покрывает полную нагрузку при остановке крупнейшего; требуется проверка отказной схемы."],
        selection:{powerKw:load}};
    }
    case "pipe-heat-loss":{
      const d=p(input,"diameter")/1000,length=n(input,"length",0),
        insulation=p(input,"thickness")/1000,
        lambda=p(input,"lambda"),delta=tdiff(input,"hot","ambient");
      const r1=d/2,r2=r1+insulation;
      const watt=2*Math.PI*lambda*length*delta/Math.log(r2/r1);
      return {rows:[output("Теплопроводные потери",watt,"Вт"),
        output("Теплопроводные потери",watt/1000,"кВт"),
        output("Суточные потери энергии",watt/1000*24,"кВт·ч")],
        notes:["Расчёт по одному слою изоляции без наружной конвекции и излучения; не является полной моделью теплопотерь."]};
    }
    case "boiler-efficiency":{
      const useful=n(input,"useful",0),fuel=p(input,"fuelPower");
      const rate=useful/fuel*100;
      return {rows:[output("Тепловой КПД котла",rate,"%"),
        output("Тепловые потери",fuel-useful,"кВт")],
        notes:["КПД по "+(input.basis==="HHV"?"ВТС":"НТС")+". Полезная и подведённая мощности должны иметь одну расчётную базу.",
          ...(rate>100?["КПД >100% для выбранной базы; проверьте определения энергии, особенно конденсационный режим."]:[])]};
    }
    case "fuel-savings":{
      const kw=n(input,"power",0),hours=n(input,"hours",0),old=eta(input,"oldEff"),
        next=eta(input,"newEff"),hu=p(input,"hu"),price=n(input,"price",0),
        investment=n(input,"investment",0);
      const savings=kw*hours/hu*(1/old-1/next),cash=savings*price;
      return {rows:[output("Годовая экономия топлива",savings,"ед."),
        output("Годовая денежная экономия",cash,"руб"),
        output("Простая окупаемость вложений",cash>0?investment/cash:0,"лет")],
        notes:[next<=old?"Новый КПД не выше исходного: экономия топлива не положительна.":"Расчёт сравнивает одинаковую полезную нагрузку при разных КПД.",
          cash<=0?"При отсутствии положительной экономии срок окупаемости не определяется.":"Окупаемость без дисконтирования и стоимости обслуживания."]};
    }
    case "burner-power":{
      const kw=n(input,"power",0),eff=eta(input),min=n(input,"min",0),max=p(input,"max");
      if(max<min)throw new Error("Максимальная мощность горелки должна быть ≥ минимальной");
      const requirement=kw/eff;
      return {rows:[output("Требуемая тепловая мощность горелки",requirement,"кВт"),
        output("Минимум паспортного диапазона",min,"кВт"),
        output("Максимум паспортного диапазона",max,"кВт"),
        output("Попадание в номинальный диапазон",requirement>=min&&requirement<=max?1:0,"да=1, нет=0",0)],
        notes:[requirement>=min&&requirement<=max?"Номинальная мощность в диапазоне, но совместимость НЕ подтверждена.":"Требуемая мощность выходит за заданный диапазон горелки.",
          "Рабочее поле противодавления, эмиссии и топливо проверяются только по паспорту производителя."],
        selection:{powerKw:kw}};
    }
    case "flue-diameter":{
      const flow=n(input,"flow",0),w=p(input,"speed"),
        d=Math.sqrt(4*flow/(3600*Math.PI*w));
      return {rows:[output("Расчётный внутренний диаметр дымохода",d*1000,"мм"),
        output("Расчётный внутренний диаметр",d,"м")],
        notes:["Расход V должен быть фактическим при температуре дымовых газов. Полная аэродинамика, тяга, конденсация и рассеивание не рассчитываются."]};
    }
    case "combustion-air":{
      const fuel=n(input,"fuel",0),l0=p(input,"l0"),alpha=p(input,"alpha");
      return {rows:[output("Теоретический расход сухого воздуха",fuel*l0,"норм. м³/ч"),
        output("Фактический расход сухого воздуха",fuel*l0*alpha,"норм. м³/ч"),
        output("Коэффициент избытка",alpha,"—")],
        notes:["L0=9,52 подходит для чистого метана; природный газ по составу пересчитывают отдельно."]};
    }
    case "signal-420ma":{
      const mode=input.signal;
      if(!["ma","volt"].includes(mode))throw new Error("Выберите тип электрического сигнала");
      const direction=input.direction;
      if(!["forward","reverse"].includes(direction))throw new Error("Выберите направление");
      const a=mode==="ma"?4:0,b=mode==="ma"?20:10,
        min=n(input,"min"),max=n(input,"max"),given=n(input,"value");
      if(max<=min)throw new Error("Верхняя граница измерения должна превышать нижнюю");
      const x=direction==="forward"?min+(given-a)/(b-a)*(max-min):given,
        signal=direction==="forward"?given:a+(given-min)/(max-min)*(b-a);
      return {rows:[output("Физическая величина",x,"ед."),
        output("Электрический сигнал",signal,mode==="ma"?"мА":"В")],
        notes:[signal<a||signal>b?"Сигнал вне номинального рабочего диапазона.":"Линейный сигнал в номинальном диапазоне."]};
    }
    default:throw new Error("Калькулятор не найден");
  }
}
