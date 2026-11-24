import { useMemo, useState, type FormEvent } from "react";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  BRAND,
  MANUFACTURER_SITE,
  SOURCE_CHECKED,
  categories,
  documents,
  filterSeries,
  formatKw,
  formatPowerRange,
  formatSteam,
  formatSteamRange,
  formatTemp,
  fuelTitle,
  fuels,
  powerBands,
  primarySpec,
  seriesById,
  seriesList,
  steamBands,
  type CatalogQuery,
  type Category,
  type CategoryId,
  type FuelId,
  type PowerBand,
  type Series,
  type SteamBand,
} from "@/data/catalog";
import { arcusCategories, arcusDocuments, arcusSeries } from "@/data/arcus";
import { broxCategories, broxDocuments, broxSeries } from "@/data/brox";
import { geffenCategories, geffenDocuments, geffenSeries } from "@/data/geffen";
import { huntelCategories, huntelDocuments, huntelSeries } from "@/data/huntel";
import { meteorCategories, meteorDocuments, meteorSeries } from "@/data/meteor";
import { nobelCategories, nobelDocuments, nobelSeries } from "@/data/nobel";
import { polykraftCategories, polykraftDocuments, polykraftSeries } from "@/data/polykraft";
import { rossenCategories, rossenDocuments, rossenSeries } from "@/data/rossen";
import { teploforCategories, teploforDocuments, teploforSeries } from "@/data/teplofor";
import { vetrosCategories, vetrosDocuments, vetrosSeries } from "@/data/vetros";
import { webCategories, webDocuments, webSeries } from "@/data/web";
import { zotaCategories, zotaDocuments, zotaSeries } from "@/data/zota";
import { temronCategories, temronDocuments, temronSeries } from "@/data/temron";
import { aetCategories, aetDocuments, aetSeries } from "@/data/aet";
import { abcoCategories, abcoDocuments, abcoSeries } from "@/data/abco";
import { acboilersCategories, acboilersDocuments, acboilersSeries } from "@/data/acboilers";
import { acvCategories, acvDocuments, acvSeries } from "@/data/acv";
import { akkayaCategories, akkayaDocuments, akkayaSeries } from "@/data/akkaya";
import { albaCategories, albaDocuments, albaSeries } from "@/data/alba";
import { alfalavalCategories, alfalavalDocuments, alfalavalSeries } from "@/data/alfalaval";
import { ambitermoCategories, ambitermoDocuments, ambitermoSeries } from "@/data/ambitermo";
import { andritzCategories, andritzDocuments, andritzSeries } from "@/data/andritz";
import { apenCategories, apenDocuments, apenSeries } from "@/data/apen";
import { aritermCategories, aritermDocuments, aritermSeries } from "@/data/ariterm";
import { asteboCategories, asteboDocuments, asteboSeries } from "@/data/astebo";
import { attsuCategories, attsuDocuments, attsuSeries } from "@/data/attsu";
import { babcockCategories, babcockDocuments, babcockSeries } from "@/data/babcock";
import { balturCategories, balturDocuments, balturSeries } from "@/data/baltur";
import { bbsCategories, bbsDocuments, bbsSeries } from "@/data/bbs";
import { bentoneCategories, bentoneDocuments, bentoneSeries } from "@/data/bentone";
import { bhelCategories, bhelDocuments, bhelSeries } from "@/data/bhel";
import { biemmedueCategories, biemmedueDocuments, biemmedueSeries } from "@/data/biemmedue";
import { binderCategories, binderDocuments, binderSeries } from "@/data/binder";
import { boschindCategories, boschindDocuments, boschindSeries } from "@/data/boschind";
import { broxtrCategories, broxtrDocuments, broxtrSeries } from "@/data/broxtr";
import { bryanCategories, bryanDocuments, bryanSeries } from "@/data/bryan";
import { buderusCategories, buderusDocuments, buderusSeries } from "@/data/buderus";
import { burnhamCategories, burnhamDocuments, burnhamSeries } from "@/data/burnham";
import { bweCategories, bweDocuments, bweSeries } from "@/data/bwe";
import { byworthCategories, byworthDocuments, byworthSeries } from "@/data/byworth";
import { bonoCategories, bonoDocuments, bonoSeries } from "@/data/bono";
import { cerneyCategories, cerneyDocuments, cerneySeries } from "@/data/cerney";
import { certussCategories, certussDocuments, certussSeries } from "@/data/certuss";
import { cfbCategories, cfbDocuments, cfbSeries } from "@/data/cfb";
import { cheemaCategories, cheemaDocuments, cheemaSeries } from "@/data/cheema";
import { chromaloxCategories, chromaloxDocuments, chromaloxSeries } from "@/data/chromalox";
import { claytonCategories, claytonDocuments, claytonSeries } from "@/data/clayton";
import { cleaverCategories, cleaverDocuments, cleaverSeries } from "@/data/cleaver";
import { cochranCategories, cochranDocuments, cochranSeries } from "@/data/cochran";
import { columbiaCategories, columbiaDocuments, columbiaSeries } from "@/data/columbia";
import { croneCategories, croneDocuments, croneSeries } from "@/data/crone";
import { cuenodCategories, cuenodDocuments, cuenodSeries } from "@/data/cuenod";
import { danstokerCategories, danstokerDocuments, danstokerSeries } from "@/data/danstoker";
import { dedietrichCategories, dedietrichDocuments, dedietrichSeries } from "@/data/dedietrich";
import { dunphyCategories, dunphyDocuments, dunphySeries } from "@/data/dunphy";
import { ecoflamCategories, ecoflamDocuments, ecoflamSeries } from "@/data/ecoflam";
import { ekotekCategories, ekotekDocuments, ekotekSeries } from "@/data/ekotek";
import { elcoCategories, elcoDocuments, elcoSeries } from "@/data/elco";
import { electrosteamCategories, electrosteamDocuments, electrosteamSeries } from "@/data/electrosteam";
import { enorpaCategories, enorpaDocuments, enorpaSeries } from "@/data/enorpa";
import { erensanCategories, erensanDocuments, erensanSeries } from "@/data/erensan";
import { etaCategories, etaDocuments, etaSeries } from "@/data/eta";
import { fbrCategories, fbrDocuments, fbrSeries } from "@/data/fbr";
import { fakoCategories, fakoDocuments, fakoSeries } from "@/data/fako";
import { fbmCategories, fbmDocuments, fbmSeries } from "@/data/fbm";
import { fergyCategories, fergyDocuments, fergySeries } from "@/data/fergy";
import { ferroliCategories, ferroliDocuments, ferroliSeries } from "@/data/ferroli";
import { fivesCategories, fivesDocuments, fivesSeries } from "@/data/fives";
import { flowairCategories, flowairDocuments, flowairSeries } from "@/data/flowair";
import { forbesCategories, forbesDocuments, forbesSeries } from "@/data/forbes";
import { fricoCategories, fricoDocuments, fricoSeries } from "@/data/frico";
import { froelingCategories, froelingDocuments, froelingSeries } from "@/data/froeling";
import { fultonCategories, fultonDocuments, fultonSeries } from "@/data/fulton";
import { garioniCategories, garioniDocuments, garioniSeries } from "@/data/garioni";
import { gekaCategories, gekaDocuments, gekaSeries } from "@/data/geka";
import { getabecCategories, getabecDocuments, getabecSeries } from "@/data/getabec";
import { gierschCategories, gierschDocuments, gierschSeries } from "@/data/giersch";
import { greczkaCategories, greczkaDocuments, greczkaSeries } from "@/data/greczka";
import { hargassnerCategories, hargassnerDocuments, hargassnerSeries } from "@/data/hargassner";
import { heiztechnikCategories, heiztechnikDocuments, heiztechnikSeries } from "@/data/heiztechnik";
import { hkbCategories, hkbDocuments, hkbSeries } from "@/data/hkb";
import { hovalCategories, hovalDocuments, hovalSeries } from "@/data/hoval";
import { hurstCategories, hurstDocuments, hurstSeries } from "@/data/hurst";
import { iciCategories, iciDocuments, iciSeries } from "@/data/ici";
import { indeckCategories, indeckDocuments, indeckSeries } from "@/data/indeck";
import { innergyCategories, innergyDocuments, innergySeries } from "@/data/innergy";
import { isimekCategories, isimekDocuments, isimekSeries } from "@/data/isimek";
import { istalCategories, istalDocuments, istalSeries } from "@/data/istal";
import { johnthompsonCategories, johnthompsonDocuments, johnthompsonSeries } from "@/data/johnthompson";
import { johnstonCategories, johnstonDocuments, johnstonSeries } from "@/data/johnston";
import { jumagCategories, jumagDocuments, jumagSeries } from "@/data/jumag";
import { justsenCategories, justsenDocuments, justsenSeries } from "@/data/justsen";
import { kalvisCategories, kalvisDocuments, kalvisSeries } from "@/data/kalvis";
import { kohlbachCategories, kohlbachDocuments, kohlbachSeries } from "@/data/kohlbach";
import { lambionCategories, lambionDocuments, lambionSeries } from "@/data/lambion";
import { linkaCategories, linkaDocuments, linkaSeries } from "@/data/linka";
import { lochinvarCategories, lochinvarDocuments, lochinvarSeries } from "@/data/lochinvar";
import { macchiCategories, macchiDocuments, macchiSeries } from "@/data/macchi";
import { markCategories, markDocuments, markSeries } from "@/data/mark";
import { metalergCategories, metalergDocuments, metalergSeries } from "@/data/metalerg";
import { mingazziniCategories, mingazziniDocuments, mingazziniSeries } from "@/data/mingazzini";
import { miuraCategories, miuraDocuments, miuraSeries } from "@/data/miura";
import { nemCategories, nemDocuments, nemSeries } from "@/data/nem";
import { nuwayCategories, nuwayDocuments, nuwaySeries } from "@/data/nuway";
import { oilonCategories, oilonDocuments, oilonSeries } from "@/data/oilon";
import { piroblocCategories, piroblocDocuments, piroblocSeries } from "@/data/pirobloc";
import { polytechnikCategories, polytechnikDocuments, polytechnikSeries } from "@/data/polytechnik";
import { powerflameCategories, powerflameDocuments, powerflameSeries } from "@/data/powerflame";
import { reimersCategories, reimersDocuments, reimersSeries } from "@/data/reimers";
import { remmingCategories, remmingDocuments, remmingSeries } from "@/data/remming";
import { rentechCategories, rentechDocuments, rentechSeries } from "@/data/rentech";
import { reznorCategories, reznorDocuments, reznorSeries } from "@/data/reznor";
import { kablitzCategories, kablitzDocuments, kablitzSeries } from "@/data/kablitz";
import { rielloCategories, rielloDocuments, rielloSeries } from "@/data/riello";
import { roburCategories, roburDocuments, roburSeries } from "@/data/robur";
import { saackeCategories, saackeDocuments, saackeSeries } from "@/data/saacke";
import { maweraCategories, maweraDocuments, maweraSeries } from "@/data/mawera";
import { sellersCategories, sellersDocuments, sellersSeries } from "@/data/sellers";
import { sigmaCategories, sigmaDocuments, sigmaSeries } from "@/data/sigma";
import { superiorCategories, superiorDocuments, superiorSeries } from "@/data/superior";
import { thermaxCategories, thermaxDocuments, thermaxSeries } from "@/data/thermax";
import { viessmannCategories, viessmannDocuments, viessmannSeries } from "@/data/viessmann";
import { vynckeCategories, vynckeDocuments, vynckeSeries } from "@/data/vyncke";
import { weishauptCategories, weishauptDocuments, weishauptSeries } from "@/data/weishaupt";
import { websterCategories, websterDocuments, websterSeries } from "@/data/webster";
import { victoryCategories, victoryDocuments, victorySeries } from "@/data/victory";
import { unicalCategories, unicalDocuments, unicalSeries } from "@/data/unical";
import { sussmanCategories, sussmanDocuments, sussmanSeries } from "@/data/sussman";
import { steamratorCategories, steamratorDocuments, steamratorSeries } from "@/data/steamrator";
import { aitsteinCategories, aitsteinDocuments, aitsteinSeries } from "@/data/aitstein";
import { winterwarmCategories, winterwarmDocuments, winterwarmSeries } from "@/data/winterwarm";
import { zozenCategories, zozenDocuments, zozenSeries } from "@/data/zozen";
import { adinCategories, adinDocuments, adinSeries } from "@/data/adin";
import { akzCategories, akzDocuments, akzSeries } from "@/data/akz";
import { belenergomashCategories, belenergomashDocuments, belenergomashSeries } from "@/data/belenergomash";
import { belboilerCategories, belboilerDocuments, belboilerSeries } from "@/data/belboiler";
import { energomashCategories, energomashDocuments, energomashSeries } from "@/data/energomash";
import { bzkotlomashCategories, bzkotlomashDocuments, bzkotlomashSeries } from "@/data/bzkotlomash";
import { bkezCategories, bkezDocuments, bkezSeries } from "@/data/bkez";
import { dkmCategories, dkmDocuments, dkmSeries } from "@/data/dkm";
import { vuthermCategories, vuthermDocuments, vuthermSeries } from "@/data/vutherm";
import { hortekCategories, hortekDocuments, hortekSeries } from "@/data/hortek";
import { irbisCategories, irbisDocuments, irbisSeries } from "@/data/irbis";
import { denkarCategories, denkarDocuments, denkarSeries } from "@/data/denkar";
import { stemiCategories, stemiDocuments, stemiSeries } from "@/data/stemi";
import { geyzerCategories, geyzerDocuments, geyzerSeries } from "@/data/geyzer";
import { komkontCategories, komkontDocuments, komkontSeries } from "@/data/komkont";
import { kommunCategories, kommunDocuments, kommunSeries } from "@/data/kommun";
import { faciCategories, faciDocuments, faciSeries } from "@/data/faci";
import { buranCategories, buranDocuments, buranSeries } from "@/data/buran";
import { vulkanCategories, vulkanDocuments, vulkanSeries } from "@/data/vulkan";
import { bogatyrCategories, bogatyrDocuments, bogatyrSeries } from "@/data/bogatyr";
import { steamexpertCategories, steamexpertDocuments, steamexpertSeries } from "@/data/steamexpert";
import { sibkotlomashCategories, sibkotlomashDocuments, sibkotlomashSeries } from "@/data/sibkotlomash";
import { cotlomashCategories, cotlomashDocuments, cotlomashSeries } from "@/data/cotlomash";
import { lutexCategories, lutexDocuments, lutexSeries } from "@/data/lutex";
import { nevskyCategories, nevskyDocuments, nevskySeries } from "@/data/nevsky";
import { octaneCategories, octaneDocuments, octaneSeries } from "@/data/octane";
import { teploveyCategories, teploveyDocuments, teploveySeries } from "@/data/teplovey";
import { termanikCategories, termanikDocuments, termanikSeries } from "@/data/termanik";
import { uralpowerCategories, uralpowerDocuments, uralpowerSeries } from "@/data/uralpower";
import { pargarantCategories, pargarantDocuments, pargarantSeries } from "@/data/pargarant";
import { pskovkotelCategories, pskovkotelDocuments, pskovkotelSeries } from "@/data/pskovkotel";
import { sibemCategories, sibemDocuments, sibemSeries } from "@/data/sibem";
import { evanCategories, evanDocuments, evanSeries } from "@/data/evan";
import { entrorosCategories, entrorosDocuments, entrorosSeries } from "@/data/entroros";
import { termokraftCategories, termokraftDocuments, termokraftSeries } from "@/data/termokraft";
import { uralkotelCategories, uralkotelDocuments, uralkotelSeries } from "@/data/uralkotel";
import { fortCategories, fortDocuments, fortSeries } from "@/data/fort";
import { electrumCategories, electrumDocuments, electrumSeries } from "@/data/electrum";
import { bikzCategories, bikzDocuments, bikzSeries } from "@/data/bikz";
import { utomCategories, utomDocuments, utomSeries } from "@/data/utom";
import { sibstrongCategories, sibstrongDocuments, sibstrongSeries } from "@/data/sibstrong";
import { bemzCategories, bemzDocuments, bemzSeries } from "@/data/bemz";
import { paratCategories, paratDocuments, paratSeries } from "@/data/parat";
import { oskolCategories, oskolDocuments, oskolSeries } from "@/data/oskol";
import { ygnisCategories, ygnisDocuments, ygnisSeries } from "@/data/ygnis";
import { bkzaCategories, bkzaDocuments, bkzaSeries } from "@/data/bkza";
import { valdexCategories, valdexDocuments, valdexSeries } from "@/data/valdex";
import { npogarantCategories, npogarantDocuments, npogarantSeries } from "@/data/npogarant";
import { ferraboilerCategories, ferraboilerDocuments, ferraboilerSeries } from "@/data/ferraboiler";
import { allthermCategories, allthermDocuments, allthermSeries } from "@/data/alltherm";
import { bkmzCategories, bkmzDocuments, bkmzSeries } from "@/data/bkmz";
import { parkerCategories, parkerDocuments, parkerSeries } from "@/data/parker";
import { pkaemCategories, pkaemDocuments, pkaemSeries } from "@/data/pkaem";
import { urgkCategories, urgkDocuments, urgkSeries } from "@/data/urgk";
import { akmzCategories, akmzDocuments, akmzSeries } from "@/data/akmz";
import { bzkoCategories, bzkoDocuments, bzkoSeries } from "@/data/bzko";
import { bzkkotelCategories, bzkkotelDocuments, bzkkotelSeries } from "@/data/bzkkotel";
import { bzkVoCategories, bzkVoDocuments, bzkVoSeries } from "@/data/bzk-vo";
import { vskzCategories, vskzDocuments, vskzSeries } from "@/data/vskz";
import { vtekCategories, vtekDocuments, vtekSeries } from "@/data/vtek43";
import { greersCategories, greersDocuments, greersSeries } from "@/data/greers";
import { gskbCategories, gskbDocuments, gskbSeries } from "@/data/gskb";
import { keoCategories, keoDocuments, keoSeries } from "@/data/keo";
import { zeromaxCategories, zeromaxDocuments, zeromaxSeries } from "@/data/zeromax";
import { pemCategories, pemDocuments, pemSeries } from "@/data/pem-energo";
import { soyuzCategories, soyuzDocuments, soyuzSeries } from "@/data/geosoyuz";
import { zkoCategories, zkoDocuments, zkoSeries } from "@/data/oaozko";
import { fillBySlug } from "@/data/fill-rest";
import { unigasCategories, unigasDocuments, unigasSeries } from "@/data/unigas";
import { rileyCategories, rileyDocuments, rileySeries } from "@/data/riley";
import { wansonCategories, wansonDocuments, wansonSeries } from "@/data/wanson";
import { analogsForRequest, similarSeries } from "@/data/series-index";
import { LeadForm, type LeadContext } from "@/components/lead-form";
import { Logo } from "@/components/logo";
import { FactoryCard } from "@/components/factory-card";
import { manufacturerBySlug } from "@/data/manufacturers";

const routeApi = getRouteApi("/manufacturers/$slug");

const lavartProfile = {
  brand: BRAND,
  site: MANUFACTURER_SITE,
  siteLabel: "omzit.ru",
  checked: SOURCE_CHECKED,
  categories,
  series: seriesList,
  documents,
};
const temronProfile = {
  brand: "TEMRON",
  site: "https://temron.ru/",
  siteLabel: "temron.ru",
  checked: "2026-11-15",
  categories: temronCategories,
  series: temronSeries,
  documents: temronDocuments,
};

const arcusProfile = {
  brand: "ARCUS",
  site: "https://www.arcus.pro/",
  siteLabel: "arcus.pro",
  checked: "2026-11-15",
  categories: arcusCategories,
  series: arcusSeries,
  documents: arcusDocuments,
};

const broxProfile = {
  brand: "BROX",
  site: "https://broxboiler.ru/",
  siteLabel: "broxboiler.ru",
  checked: "2026-11-15",
  categories: broxCategories,
  series: broxSeries,
  documents: broxDocuments,
};

const geffenProfile = {
  brand: "GEFFEN",
  site: "https://geffen.ru/",
  siteLabel: "geffen.ru",
  checked: "2026-11-15",
  categories: geffenCategories,
  series: geffenSeries,
  documents: geffenDocuments,
};

const huntelProfile = {
  brand: "HUNTEL",
  site: "https://huntel.ru/",
  siteLabel: "huntel.ru",
  checked: "2026-11-15",
  categories: huntelCategories,
  series: huntelSeries,
  documents: huntelDocuments,
};

const meteorProfile = {
  brand: "METEOR / LaggarTT",
  site: "https://laggartt.ru/",
  siteLabel: "laggartt.ru",
  checked: "2026-11-15",
  categories: meteorCategories,
  series: meteorSeries,
  documents: meteorDocuments,
};

const nobelProfile = {
  brand: "NOBEL",
  site: "https://nobelteplo.ru/",
  siteLabel: "nobelteplo.ru",
  checked: "2026-11-16",
  categories: nobelCategories,
  series: nobelSeries,
  documents: nobelDocuments,
};

const polykraftProfile = {
  brand: "POLYKRAFT",
  site: "https://polykraft.ru/",
  siteLabel: "polykraft.ru",
  checked: "2026-11-16",
  categories: polykraftCategories,
  series: polykraftSeries,
  documents: polykraftDocuments,
};

const rossenProfile = {
  brand: "ROSSEN",
  site: "https://rossen.ru/",
  siteLabel: "rossen.ru",
  checked: "2026-11-16",
  categories: rossenCategories,
  series: rossenSeries,
  documents: rossenDocuments,
};

const teploforProfile = {
  brand: "TEPLOFOR",
  site: "https://teplofor.pro/",
  siteLabel: "teplofor.pro",
  checked: "2026-11-16",
  categories: teploforCategories,
  series: teploforSeries,
  documents: teploforDocuments,
};

const vetrosProfile = {
  brand: "VETROS",
  site: "https://vetros-boiler.ru/",
  siteLabel: "vetros-boiler.ru",
  checked: "2026-11-16",
  categories: vetrosCategories,
  series: vetrosSeries,
  documents: vetrosDocuments,
};

const webProfile = {
  brand: "W.E.B.",
  site: "https://wiseecoburner.ru/",
  siteLabel: "wiseecoburner.ru",
  checked: "2026-11-16",
  categories: webCategories,
  series: webSeries,
  documents: webDocuments,
};

const zotaProfile = {
  brand: "ZOTA",
  site: "https://zota.ru/",
  siteLabel: "zota.ru",
  checked: "2026-11-16",
  categories: zotaCategories,
  series: zotaSeries,
  documents: zotaDocuments,
};

function profileFor(slug: string) {
  if (slug === "temron") return temronProfile;
  if (slug === "arcus") return arcusProfile;
  if (slug === "brox") return broxProfile;
  if (slug === "geffen") return geffenProfile;
  if (slug === "huntel") return huntelProfile;
  if (slug === "meteor-thermo") return meteorProfile;
  if (slug === "nobel") return nobelProfile;
  if (slug === "polykraft") return polykraftProfile;
  if (slug === "rossen") return rossenProfile;
  if (slug === "teplofor") return teploforProfile;
  if (slug === "vetros") return vetrosProfile;
  if (slug === "w-e-b") return webProfile;
  if (slug === "zota") return zotaProfile;
  if (slug === "lavart") return lavartProfile;
  if (slug === "aalborg-energie-technik-aet") return pack("Aalborg Energie Technik (AET)", aetCategories, aetSeries, aetDocuments);
  if (slug === "ab-co-tt-boilers") return pack("AB&CO – TT BOILERS", abcoCategories, abcoSeries, abcoDocuments);
  if (slug === "ac-boilers-ansaldo-boilers") return pack("AC Boilers", acboilersCategories, acboilersSeries, acboilersDocuments);
  if (slug === "acv") return pack("ACV", acvCategories, acvSeries, acvDocuments);
  if (slug === "akkaya") return pack("Akkaya", akkayaCategories, akkayaSeries, akkayaDocuments);
  if (slug === "alba-steam-generator") return pack("Alba Steam Generator", albaCategories, albaSeries, albaDocuments);
  if (slug === "alfa-laval-aalborg") return pack("Alfa Laval Aalborg", alfalavalCategories, alfalavalSeries, alfalavalDocuments);
  if (slug === "ambitermo") return pack("Ambitermo", ambitermoCategories, ambitermoSeries, ambitermoDocuments);
  if (slug === "andritz") return pack("ANDRITZ", andritzCategories, andritzSeries, andritzDocuments);
  if (slug === "apen-group") return pack("Apen Group", apenCategories, apenSeries, apenDocuments);
  if (slug === "ariterm") return pack("Ariterm", aritermCategories, aritermSeries, aritermDocuments);
  if (slug === "astebo") return pack("astebo", asteboCategories, asteboSeries, asteboDocuments);
  if (slug === "teyvi") return pack("ATTSU", attsuCategories, attsuSeries, attsuDocuments);
  if (slug === "babcock-wilcox") return pack("Babcock & Wilcox", babcockCategories, babcockSeries, babcockDocuments);
  if (slug === "riley-power") return pack("Riley Power", rileyCategories, rileySeries, rileyDocuments);
  if (slug === "babcock-wanson") return pack("Babcock Wanson", wansonCategories, wansonSeries, wansonDocuments);
  if (slug === "baltur") return pack("Baltur", balturCategories, balturSeries, balturDocuments);
  if (slug === "bbs-gmbh") return pack("BBS", bbsCategories, bbsSeries, bbsDocuments);
  if (slug === "bentone") return pack("Bentone", bentoneCategories, bentoneSeries, bentoneDocuments);
  if (slug === "bhel") return pack("BHEL", bhelCategories, bhelSeries, bhelDocuments);
  if (slug === "biemmedue") return pack("Biemmedue", biemmedueCategories, biemmedueSeries, biemmedueDocuments);
  if (slug === "binder-energietechnik") return pack("BINDER", binderCategories, binderSeries, binderDocuments);
  if (slug === "bosch-industriekessel") return pack("Bosch Industriekessel", boschindCategories, boschindSeries, boschindDocuments);
  if (slug === "brox-brox") return pack("BROX", broxtrCategories, broxtrSeries, broxtrDocuments);
  if (slug === "bryan-steam") return pack("Bryan Steam", bryanCategories, bryanSeries, bryanDocuments);
  if (slug === "buderus") return pack("Buderus", buderusCategories, buderusSeries, buderusDocuments);
  if (slug === "burmeister-wain-energy-bwe") return pack("BWE", bweCategories, bweSeries, bweDocuments);
  if (slug === "burnham-commercial") return pack("Burnham Commercial", burnhamCategories, burnhamSeries, burnhamDocuments);
  if (slug === "byworth-boilers") return pack("Byworth", byworthCategories, byworthSeries, byworthDocuments);
  if (slug === "bono-energia") return pack("Bono Energia", bonoCategories, bonoSeries, bonoDocuments);
  if (slug === "cerney") return pack("CERNEY", cerneyCategories, cerneySeries, cerneyDocuments);
  if (slug === "certuss") return pack("CERTUSS", certussCategories, certussSeries, certussDocuments);
  if (slug === "cfb-boilers") return pack("CFB Boilers", cfbCategories, cfbSeries, cfbDocuments);
  if (slug === "cheema-boilers-cbl") return pack("Cheema Boilers", cheemaCategories, cheemaSeries, cheemaDocuments);
  if (slug === "chromalox") return pack("Chromalox", chromaloxCategories, chromaloxSeries, chromaloxDocuments);
  if (slug === "cib-unigas") return pack("CIB UNIGAS", unigasCategories, unigasSeries, unigasDocuments);
  if (slug === "clayton-industries") return pack("Clayton", claytonCategories, claytonSeries, claytonDocuments);
  if (slug === "cleaver-brooks") return pack("Cleaver-Brooks", cleaverCategories, cleaverSeries, cleaverDocuments);
  if (slug === "cochran") return pack("Cochran", cochranCategories, cochranSeries, cochranDocuments);
  if (slug === "columbia-boiler") return pack("Columbia Boiler", columbiaCategories, columbiaSeries, columbiaDocuments);
  if (slug === "cuenod") return pack("Cuenod", cuenodCategories, cuenodSeries, cuenodDocuments);
  if (slug === "danstoker") return pack("Danstoker", danstokerCategories, danstokerSeries, danstokerDocuments);
  if (slug === "de-dietrich-heating") return pack("De Dietrich", dedietrichCategories, dedietrichSeries, dedietrichDocuments);
  if (slug === "dunphy-combustion") return pack("Dunphy", dunphyCategories, dunphySeries, dunphyDocuments);
  if (slug === "ecoflam") return pack("Ecoflam", ecoflamCategories, ecoflamSeries, ecoflamDocuments);
  if (slug === "ekotek-heat-technology") return pack("Ekotek", ekotekCategories, ekotekSeries, ekotekDocuments);
  if (slug === "elco-burners") return pack("ELCO Burners", elcoCategories, elcoSeries, elcoDocuments);
  if (slug === "electro-steam-generator") return pack("Electro-Steam", electrosteamCategories, electrosteamSeries, electrosteamDocuments);
  if (slug === "enorpa") return pack("Enorpa", enorpaCategories, enorpaSeries, enorpaDocuments);
  if (slug === "erensan") return pack("Erensan", erensanCategories, erensanSeries, erensanDocuments);
  if (slug === "eta-heiztechnik") return pack("ETA", etaCategories, etaSeries, etaDocuments);
  if (slug === "f-h-crone") return pack("F&H Crone", croneCategories, croneSeries, croneDocuments);
  if (slug === "f-b-r-bruciatori") return pack("F.B.R.", fbrCategories, fbrSeries, fbrDocuments);
  if (slug === "fako") return pack("FAKO", fakoCategories, fakoSeries, fakoDocuments);
  if (slug === "fbm-hudson-italiana") return pack("FBM Hudson", fbmCategories, fbmSeries, fbmDocuments);
  if (slug === "komforts") return pack("FERGY", fergyCategories, fergySeries, fergyDocuments);
  if (slug === "ferroli-industrial-solutions") return pack("Ferroli", ferroliCategories, ferroliSeries, ferroliDocuments);
  if (slug === "fives-north-american-combustion") return pack("Fives", fivesCategories, fivesSeries, fivesDocuments);
  if (slug === "flowair") return pack("FLOWAIR", flowairCategories, flowairSeries, flowairDocuments);
  if (slug === "forbes-marshall") return pack("Forbes Marshall", forbesCategories, forbesSeries, forbesDocuments);
  if (slug === "frico") return pack("Frico", fricoCategories, fricoSeries, fricoDocuments);
  if (slug === "fr-ling") return pack("Fröling", froelingCategories, froelingSeries, froelingDocuments);
  if (slug === "fulton") return pack("Fulton", fultonCategories, fultonSeries, fultonDocuments);
  if (slug === "garioni-naval") return pack("Garioni Naval", garioniCategories, garioniSeries, garioniDocuments);
  if (slug === "gekakonus") return pack("GekaKonus", gekaCategories, gekaSeries, gekaDocuments);
  if (slug === "getabec") return pack("GETABEC", getabecCategories, getabecSeries, getabecDocuments);
  if (slug === "giersch") return pack("Giersch", gierschCategories, gierschSeries, gierschDocuments);
  if (slug === "greczka") return pack("Greczka", greczkaCategories, greczkaSeries, greczkaDocuments);
  if (slug === "hargassner-industry-gilles") return pack("Hargassner", hargassnerCategories, hargassnerSeries, hargassnerDocuments);
  if (slug === "heiztechnik") return pack("Heiztechnik", heiztechnikCategories, heiztechnikSeries, heiztechnikDocuments);
  if (slug === "hkb-boiler-solutions") return pack("HKB", hkbCategories, hkbSeries, hkbDocuments);
  if (slug === "hoval") return pack("Hoval", hovalCategories, hovalSeries, hovalDocuments);
  if (slug === "hurst-boiler-welding") return pack("Hurst", hurstCategories, hurstSeries, hurstDocuments);
  if (slug === "ici-caldaie-lcz") return pack("ICI Caldaie", iciCategories, iciSeries, iciDocuments);
  if (slug === "indeck-group") return pack("Indeck", indeckCategories, indeckSeries, indeckDocuments);
  if (slug === "eratic") return pack("INNERGY", innergyCategories, innergySeries, innergyDocuments);
  if (slug === "isimek") return pack("ISIMEK", isimekCategories, isimekSeries, isimekDocuments);
  if (slug === "istal") return pack("ISTAL", istalCategories, istalSeries, istalDocuments);
  if (slug === "john-thompson") return pack("John Thompson", johnthompsonCategories, johnthompsonSeries, johnthompsonDocuments);
  if (slug === "johnston-boiler") return pack("Johnston", johnstonCategories, johnstonSeries, johnstonDocuments);
  if (slug === "schneider-kessel-berlin") return pack("JUMAG", jumagCategories, jumagSeries, jumagDocuments);
  if (slug === "justsen-energiteknik-euro-therm") return pack("Justsen", justsenCategories, justsenSeries, justsenDocuments);
  if (slug === "kalvis") return pack("Kalvis", kalvisCategories, kalvisSeries, kalvisDocuments);
  if (slug === "kohlbach-energieanlagen") return pack("Kohlbach", kohlbachCategories, kohlbachSeries, kohlbachDocuments);
  if (slug === "lambion-energy-solutions") return pack("LAMBION", lambionCategories, lambionSeries, lambionDocuments);
  if (slug === "linka-energy") return pack("Linka", linkaCategories, linkaSeries, linkaDocuments);
  if (slug === "lochinvar") return pack("Lochinvar", lochinvarCategories, lochinvarSeries, lochinvarDocuments);
  if (slug === "macchi") return pack("MACCHI", macchiCategories, macchiSeries, macchiDocuments);
  if (slug === "mark-climate-technology") return pack("Mark", markCategories, markSeries, markDocuments);
  if (slug === "metalerg") return pack("MetalERG", metalergCategories, metalergSeries, metalergDocuments);
  if (slug === "mingazzini") return pack("MINGAZZINI", mingazziniCategories, mingazziniSeries, mingazziniDocuments);
  if (slug === "miura") return pack("MIURA", miuraCategories, miuraSeries, miuraDocuments);
  if (slug === "nem-energy") return pack("NEM", nemCategories, nemSeries, nemDocuments);
  if (slug === "nu-way") return pack("Nu-Way", nuwayCategories, nuwaySeries, nuwayDocuments);
  if (slug === "oilon") return pack("Oilon", oilonCategories, oilonSeries, oilonDocuments);
  if (slug === "pirobloc") return pack("Pirobloc", piroblocCategories, piroblocSeries, piroblocDocuments);
  if (slug === "polytechnik") return pack("Polytechnik", polytechnikCategories, polytechnikSeries, polytechnikDocuments);
  if (slug === "power-flame") return pack("Power Flame", powerflameCategories, powerflameSeries, powerflameDocuments);
  if (slug === "reimers-electra-steam") return pack("Reimers", reimersCategories, reimersSeries, reimersDocuments);
  if (slug === "remming") return pack("REMMING", remmingCategories, remmingSeries, remmingDocuments);
  if (slug === "rentech-boiler-systems") return pack("RENTECH", rentechCategories, rentechSeries, rentechDocuments);
  if (slug === "reznor") return pack("Reznor", reznorCategories, reznorSeries, reznorDocuments);
  if (slug === "richard-kablitz") return pack("Kablitz", kablitzCategories, kablitzSeries, kablitzDocuments);
  if (slug === "riello") return pack("Riello", rielloCategories, rielloSeries, rielloDocuments);
  if (slug === "robur") return pack("Robur", roburCategories, roburSeries, roburDocuments);
  if (slug === "saacke") return pack("SAACKE", saackeCategories, saackeSeries, saackeDocuments);
  if (slug === "mawera") return pack("Mawera", maweraCategories, maweraSeries, maweraDocuments);
  if (slug === "sellers-manufacturing") return pack("Sellers", sellersCategories, sellersSeries, sellersDocuments);
  if (slug === "sigma-thermal") return pack("Sigma Thermal", sigmaCategories, sigmaSeries, sigmaDocuments);
  if (slug === "superior-boiler") return pack("Superior", superiorCategories, superiorSeries, superiorDocuments);
  if (slug === "thermax") return pack("Thermax", thermaxCategories, thermaxSeries, thermaxDocuments);
  if (slug === "viessmann-vitomax") return pack("Viessmann", viessmannCategories, viessmannSeries, viessmannDocuments);
  if (slug === "vyncke") return pack("VYNCKE", vynckeCategories, vynckeSeries, vynckeDocuments);
  if (slug === "weishaupt") return pack("Weishaupt", weishauptCategories, weishauptSeries, weishauptDocuments);
  if (slug === "webster-combustion") return pack("Webster", websterCategories, websterSeries, websterDocuments);
  if (slug === "victory-energy") return pack("Victory Energy", victoryCategories, victorySeries, victoryDocuments);
  if (slug === "wiesberg") return pack("Unical", unicalCategories, unicalSeries, unicalDocuments);
  if (slug === "dht") return pack("Sussman", sussmanCategories, sussmanSeries, sussmanDocuments);
  if (slug === "steamrator") return pack("Steamrator", steamratorCategories, steamratorSeries, steamratorDocuments);
  if (slug === "ait-stein") return pack("AIT-STEIN", aitsteinCategories, aitsteinSeries, aitsteinDocuments);
  if (slug === "winterwarm") return pack("Winterwarm", winterwarmCategories, winterwarmSeries, winterwarmDocuments);
  if (slug === "zozen-boiler") return pack("ZOZEN", zozenCategories, zozenSeries, zozenDocuments);
  if (slug === "adin") return pack("АДИН", adinCategories, adinSeries, adinDocuments);
  if (slug === "akz22") return pack("АКЗ", akzCategories, akzSeries, akzDocuments);
  if (slug === "belenergomash") return pack("Белэнергомашсервис", belenergomashCategories, belenergomashSeries, belenergomashDocuments);
  if (slug === "belboiler") return pack("Белкотломаш", belboilerCategories, belboilerSeries, belboilerDocuments);
  if (slug === "energomash") return pack("БЗЭМ", energomashCategories, energomashSeries, energomashDocuments);
  if (slug === "bzkotlomash") return pack("Котломаш", bzkotlomashCategories, bzkotlomashSeries, bzkotlomashDocuments);
  if (slug === "bkez") return pack("БКЗ", bkezCategories, bkezSeries, bkezDocuments);
  if (slug === "dkm") return pack("Дорогобужкотломаш", dkmCategories, dkmSeries, dkmDocuments);
  if (slug === "vutherm") return pack("VUTHERM", vuthermCategories, vuthermSeries, vuthermDocuments);
  if (slug === "hortek-hl") return pack("HORTEK", hortekCategories, hortekSeries, hortekDocuments);
  if (slug === "irbis-bor") return pack("Ирбис", irbisCategories, irbisSeries, irbisDocuments);
  if (slug === "denkar") return pack("ДЭНКАР", denkarCategories, denkarSeries, denkarDocuments);
  if (slug === "stemi") return pack("ЗСТЭМИ", stemiCategories, stemiSeries, stemiDocuments);
  if (slug === "geyzer") return pack("Гейзер", geyzerCategories, geyzerSeries, geyzerDocuments);
  if (slug === "komkont") return pack("KOMKONT", komkontCategories, komkontSeries, komkontDocuments);
  if (slug === "kommun") return pack("Вятские котлы", kommunCategories, kommunSeries, kommunDocuments);
  if (slug === "faci") return pack("FACI", faciCategories, faciSeries, faciDocuments);
  if (slug === "buran-boiler") return pack("Buran", buranCategories, buranSeries, buranDocuments);
  if (slug === "vulkan-rus") return pack("VULKAN", vulkanCategories, vulkanSeries, vulkanDocuments);
  if (slug === "kotel-bogatyr") return pack("Богатырь", bogatyrCategories, bogatyrSeries, bogatyrDocuments);
  if (slug === "steamexpert") return pack("STEAMEXPERT", steamexpertCategories, steamexpertSeries, steamexpertDocuments);
  if (slug === "sibkotlomash") return pack("Сибкотломаш", sibkotlomashCategories, sibkotlomashSeries, sibkotlomashDocuments);
  if (slug === "cotlomash") return pack("Котломаш", cotlomashCategories, cotlomashSeries, cotlomashDocuments);
  if (slug === "lutex") return pack("LUTEX", lutexCategories, lutexSeries, lutexDocuments);
  if (slug === "nvsk") return pack("Невский", nevskyCategories, nevskySeries, nevskyDocuments);
  if (slug === "octane") return pack("Октан", octaneCategories, octaneSeries, octaneDocuments);
  if (slug === "npo-teplovey") return pack("Тепловей", teploveyCategories, teploveySeries, teploveyDocuments);
  if (slug === "termanik") return pack("Терманик", termanikCategories, termanikSeries, termanikDocuments);
  if (slug === "ural-power") return pack("Ural-Power", uralpowerCategories, uralpowerSeries, uralpowerDocuments);
  if (slug === "pargarant") return pack("Паргарант", pargarantCategories, pargarantSeries, pargarantDocuments);
  if (slug === "pskovkotel") return pack("ПКЗ", pskovkotelCategories, pskovkotelSeries, pskovkotelDocuments);
  if (slug === "sibem-bkz") return pack("Сибэнергомаш", sibemCategories, sibemSeries, sibemDocuments);
  if (slug === "evan") return pack("EVAN", evanCategories, evanSeries, evanDocuments);
  if (slug === "entroros") return pack("Энтророс", entrorosCategories, entrorosSeries, entrorosDocuments);
  if (slug === "termokraft") return pack("Термокрафт", termokraftCategories, termokraftSeries, termokraftDocuments);
  if (slug === "uralkotel") return pack("Уралкотел", uralkotelCategories, uralkotelSeries, uralkotelDocuments);
  if (slug === "fort") return pack("ФОРТ", fortCategories, fortSeries, fortDocuments);
  if (slug === "electrum-spb") return pack("Электрум", electrumCategories, electrumSeries, electrumDocuments);
  if (slug === "bikz") return pack("ЭнергоСтройДеталь", bikzCategories, bikzSeries, bikzDocuments);
  if (slug === "utomprom") return pack("Ютом Пром", utomCategories, utomSeries, utomDocuments);
  if (slug === "sibstrong") return pack("СибСтронг", sibstrongCategories, sibstrongSeries, sibstrongDocuments);
  if (slug === "bemz") return pack("Барнаулэнергомаш", bemzCategories, bemzSeries, bemzDocuments);
  if (slug === "parat-halvorsen") return pack("PARAT", paratCategories, paratSeries, paratDocuments);
  if (slug === "kotel-oskol") return pack("СТМ-Оскол", oskolCategories, oskolSeries, oskolDocuments);
  if (slug === "ygnis") return pack("YGNIS", ygnisCategories, ygnisSeries, ygnisDocuments);
  if (slug === "bkza") return pack("БКЗА", bkzaCategories, bkzaSeries, bkzaDocuments);
  if (slug === "valdex") return pack("VALDEX", valdexCategories, valdexSeries, valdexDocuments);
  if (slug === "npogarant") return pack("Гарант", npogarantCategories, npogarantSeries, npogarantDocuments);
  if (slug === "ferraboiler") return pack("Ferra", ferraboilerCategories, ferraboilerSeries, ferraboilerDocuments);
  if (slug === "alltherm") return pack("Аллтерм", allthermCategories, allthermSeries, allthermDocuments);
  if (slug === "bkmz") return pack("БКМЗ", bkmzCategories, bkmzSeries, bkmzDocuments);
  if (slug === "parker-boiler") return pack("Parker", parkerCategories, parkerSeries, parkerDocuments);
  if (slug === "pkaem") return pack("Алтайэнергомаш", pkaemCategories, pkaemSeries, pkaemDocuments);
  if (slug === "urgk") return pack("УГК", urgkCategories, urgkSeries, urgkDocuments);
  if (slug === "akmz") return pack("АКМЗ", akmzCategories, akmzSeries, akmzDocuments);
  if (slug === "bzko") return pack("БЗКО", bzkoCategories, bzkoSeries, bzkoDocuments);
  if (slug === "bzkkotel") return pack("БЗК", bzkkotelCategories, bzkkotelSeries, bzkkotelDocuments);
  if (slug === "bzk-vo") return pack("БЗКиВО", bzkVoCategories, bzkVoSeries, bzkVoDocuments);
  if (slug === "vskz") return pack("ВСКЗ", vskzCategories, vskzSeries, vskzDocuments);
  if (slug === "vtek43") return pack("ВТЭК", vtekCategories, vtekSeries, vtekDocuments);
  if (slug === "greers") return pack("ГРЕЕРС", greersCategories, greersSeries, greersDocuments);
  if (slug === "gskb") return pack("ГСКБ", gskbCategories, gskbSeries, gskbDocuments);
  if (slug === "keo") return pack("ГСКБ КЭО", keoCategories, keoSeries, keoDocuments);
  if (slug === "zeromax44") return pack("Зеромакс", zeromaxCategories, zeromaxSeries, zeromaxDocuments);
  if (slug === "pem-energo") return pack("ПроЭнергоМаш", pemCategories, pemSeries, pemDocuments);
  if (slug === "geosoyuz") return pack("Союз", soyuzCategories, soyuzSeries, soyuzDocuments);
  if (slug === "oaozko") return pack("ЗКО", zkoCategories, zkoSeries, zkoDocuments);
  const filled = fillBySlug(slug);
  if (filled) return pack(filled.title, filled.categories, filled.series, filled.documents);
  return emptyProfile(slug);
}

function pack(
  brand: string,
  categories: Category[],
  series: Series[],
  documents: { title: string }[],
) {
  return { brand, site: "", siteLabel: "", checked: "2026-11-16", categories, series, documents };
}

function emptyProfile(slug: string) {
  const maker = manufacturerBySlug(slug);
  const categories: Category[] =
    maker?.line === "burner"
      ? [{ id: "auto", title: "Горелки", param: "none" }]
      : maker?.line === "air"
        ? [{ id: "air", title: "Воздухонагреватели", param: "power" }]
        : [
            { id: "water", title: "Водогрейные", param: "power" },
            { id: "steam", title: "Паровые", param: "steam" },
          ];
  return {
    brand: maker?.title ?? slug,
    site: "",
    siteLabel: "",
    checked: "2026-11-16",
    categories,
    series: [] as Series[],
    documents: [] as { title: string }[],
  };
}

const PAGE = 24;

export function CatalogPage() {
  const { slug } = routeApi.useParams();
  const maker = manufacturerBySlug(slug);
  const profile = profileFor(slug);
  const search = routeApi.useSearch();
  const navigate = useNavigate({ from: "/manufacturers/$slug" });
  const [shown, setShown] = useState(PAGE);
  const [lead, setLead] = useState<LeadContext | null>(null);
  const [analogsFor, setAnalogsFor] = useState<Series | null>(null);
  const query = useMemo<CatalogQuery>(
    () => ({
      type: profile.categories.some((item) => item.id === search.type) ? (search.type as CategoryId) : undefined,
      q: search.q,
      fuel: isFuel(search.fuel) ? search.fuel : undefined,
      power: isPower(search.power) ? search.power : undefined,
      steam: isSteam(search.steam) ? search.steam : undefined,
      sort: search.sort === "param" || search.sort === "name" ? search.sort : undefined,
    }),
    [search, profile],
  );
  const rows = useMemo(() => filterSeries(query, profile.series), [query, profile.series]);
  const models = useMemo(() => flattenModels(rows), [rows]);
  const visibleModels = models.slice(0, shown);
  const activeSeries = seriesById(search.series, profile.series);
  const category = profile.categories.find((item) => item.id === query.type);
  const showPower = !query.type || category?.param === "power";
  const showSteam = !query.type || category?.param === "steam";

  function patch(next: Partial<typeof search>, dropSeries = true) {
    setShown(PAGE);
    navigate({
      search: (prev) => {
        const merged = { ...prev, ...next };
        if (dropSeries) merged.series = undefined;
        for (const key of Object.keys(merged) as (keyof typeof merged)[]) {
          if (!merged[key]) delete merged[key];
        }
        return merged;
      },
      resetScroll: false,
      replace: true,
    });
  }

  function openSeries(id: string) {
    navigate({
      search: (prev) => ({ ...prev, series: id }),
      resetScroll: false,
    });
  }

  function closeSeries() {
    navigate({
      search: (prev) => {
        const next = { ...prev };
        delete next.series;
        return next;
      },
      resetScroll: false,
    });
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-30 bg-[#161616] text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Logo light />
          <nav className="ml-4 hidden items-center gap-5 text-sm text-white/75 lg:flex" aria-label="Навигация">
            <Link to="/" search={{ line: "boiler" }} className="hover:text-white">Котлы</Link>
            <Link to="/" search={{ line: "burner" }} className="hover:text-white">Горелки</Link>
            <Link to="/" search={{ line: "air" }} className="hover:text-white">Воздухонагреватели</Link>
            <Link to="/" hash="manufacturers" className="hover:text-white">Производители</Link>
            <Link to="/politika" className="hover:text-white">О каталоге</Link>
          </nav>
          <Link to="/" hash="podbor" className="ml-auto mr-14 hidden h-10 items-center rounded-full lg:mr-0 lg:inline-flex bg-accent px-4 text-sm font-semibold text-on-accent hover:bg-accent-hover">
            Подобрать модель
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-6 pb-8">
        <p className="text-xs text-muted">
          <Link to="/" className="hover:text-ink">Главная</Link>
          <span> / </span>
          <Link to="/" hash="manufacturers" className="hover:text-ink">Производители</Link>
          <span> / </span>
          <span>{profile.brand}</span>
        </p>
        <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          Каталог производителя{maker ? ` · ${maker.place}` : ""}
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="max-w-3xl font-display text-4xl leading-[0.95] font-extrabold tracking-[-0.04em] text-balance md:text-6xl">
            {category ? category.title : maker?.line === "burner" ? "Горелки" : maker?.line === "air" ? "Воздухонагреватели" : "Котлы"}{" "}
            <span className="text-accent">{profile.brand}</span>
          </h1>
          {models[0] ? (
            <p className="text-right text-sm text-muted">
              <span className="block font-display text-2xl font-extrabold tracking-[-0.04em] text-ink">{models[0].series.name}</span>
              Серия в демонстрационной выборке
            </p>
          ) : null}
        </div>
        <p className="mt-3 max-w-3xl text-sm text-pretty text-muted">
          Открытые серии и типоразмеры. Это не сайт производителя и не предложение купить оборудование.
        </p>
        <p className="mt-3 text-sm">
          {maker ? <span className="mr-4">{maker.place}</span> : null}
          <span>Взято с оф. сайта производителя</span>
        </p>

        <form
          className="mt-6 rounded-2xl border border-line bg-surface p-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            patch({ q: String(data.get("q") ?? "") });
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Фильтр оборудования</p>
            {query.q || query.fuel || query.power || query.steam || query.type ? (
              <button type="button" className="text-sm text-muted hover:text-ink" onClick={() => patch({ type: undefined, q: undefined, fuel: undefined, power: undefined, steam: undefined })}>
                Сбросить фильтры
              </button>
            ) : null}
          </div>
          <div className="grid gap-2 md:grid-cols-4">
            <label className="grid gap-1 text-xs font-semibold tracking-wide text-muted uppercase">
              Тип
              <select className="h-11 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink normal-case" value={query.type ?? ""} onChange={(event) => patch({ type: event.target.value || undefined })}>
                <option value="">Все серии</option>
                {profile.categories.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-xs font-semibold tracking-wide text-muted uppercase">
              Топливо
              <select className="h-11 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink normal-case" value={query.fuel ?? ""} onChange={(event) => patch({ fuel: event.target.value || undefined })}>
                <option value="">Любое</option>
                {fuels.filter((item) => profile.series.some((series) => series.fuels.includes(item.id))).map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-xs font-semibold tracking-wide text-muted uppercase">
              {showSteam && !showPower ? "Пар" : "Мощность"}
              <select
                className="h-11 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink normal-case"
                value={showSteam && !showPower ? (query.steam ?? "") : (query.power ?? "")}
                onChange={(event) => patch(showSteam && !showPower ? { steam: event.target.value || undefined } : { power: event.target.value || undefined })}
              >
                <option value="">Любая</option>
                {(showSteam && !showPower ? steamBands : powerBands).map((band) => (
                  <option key={band.id} value={band.id}>{band.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-xs font-semibold tracking-wide text-muted uppercase">
              Сортировка
              <select className="h-11 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink normal-case" value={query.sort ?? ""} onChange={(event) => patch({ sort: event.target.value || undefined })}>
                <option value="">Порядок каталога</option>
                <option value="name">По названию</option>
                <option value="param">По параметру</option>
              </select>
            </label>
          </div>
          <div className="mt-3 flex justify-end">
            <button type="submit" className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-hover">Показать</button>
          </div>
        </form>

        {profile.series.length === 0 ? (
          <MissingSeries brand={profile.brand} openInitially={search.ask === "1"} />
        ) : models.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
            <p className="font-semibold">По этим условиям моделей нет</p>
            <button type="button" className="mt-4 inline-flex h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold text-on-accent" onClick={() => patch({ type: undefined, q: undefined, fuel: undefined, power: undefined, steam: undefined })}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <section className="mt-8">
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="text-xl font-semibold sm:text-2xl">Модели {profile.brand}</h2>
              <p className="text-sm text-muted tabular-nums">{models.length}</p>
            </div>
            <ul className="overflow-hidden rounded-2xl border border-line bg-surface">
              {visibleModels.map((row) => (
                <li key={row.key} className="grid items-center gap-3 border-b border-line px-3 py-3 last:border-b-0 md:grid-cols-[1.5fr_0.7fr_0.8fr_0.7fr_auto] md:px-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <img src={row.series.image} alt="" width={80} height={60} className="size-14 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <button type="button" className="max-w-full text-left font-semibold break-words hover:text-accent" onClick={() => openSeries(row.series.id)}>{row.title}</button>
                      <p className="text-xs text-muted break-words">{row.series.kind} · {row.series.name}</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="block font-semibold tabular-nums">{row.main}</span>
                    <span className="text-xs text-muted">{row.sub}</span>
                  </p>
                  <p className="text-sm text-muted">{row.series.feature}</p>
                  <p className="text-sm">{row.series.fuels.length ? row.series.fuels.map(fuelTitle).join(" / ") : "Не указано"}</p>
                  <div className="flex items-center gap-3">
                    <button type="button" className="inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-on-accent hover:bg-accent-hover" onClick={() => setLead({ intent: "kp", seriesId: row.series.id, sizeId: row.sizeId, categoryId: row.series.categoryId })}>
                      Подобрать
                    </button>
                    <button type="button" className="text-sm font-semibold text-ink hover:text-accent" onClick={() => openSeries(row.series.id)}>
                      Характеристики
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">Иллюстрация условная и не воспроизводит геометрию конкретного типоразмера. Взято с оф. сайта производителя.</p>
          </section>
        )}
        {shown < models.length ? (
          <button type="button" className="mx-auto mt-4 flex h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold" onClick={() => setShown((value) => value + PAGE)}>
            Показать ещё
          </button>
        ) : null}

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Информация о производителе</p>
            <h2 className="mt-2 text-3xl font-semibold">О производителе {profile.brand}</h2>
            <p className="mt-3 text-sm text-pretty text-muted">
              {maker ? maker.name : profile.brand}. {maker ? `${maker.place}. ` : ""}
              Специализация в справочнике: {maker?.line === "burner" ? "горелки" : maker?.line === "air" ? "воздухонагреватели" : "промышленные котлы"}. Год основания здесь не указан: в этой сборке он не подтверждён.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.categories.map((item) => (
                <span key={item.id} className="rounded-full bg-chip px-3 py-1 text-sm">{item.title}</span>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">Взято с оф. сайта производителя. Сверка: {profile.checked}.</p>
          </div>
          <aside className="rounded-2xl bg-[#161616] p-5 text-white">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#f0c4cc] uppercase">Полезная информация</p>
            <h2 className="mt-2 text-2xl font-semibold">Что есть в карточке</h2>
            <p className="mt-3 text-sm text-white/70">Параметр показывается только если он есть в открытом источнике. Нет цифры — поле не заполняется нулём.</p>
            {profile.documents.length ? (
              <ul className="mt-4 grid gap-1 text-sm">
                {profile.documents.map((doc) => (
                  <li key={doc.title}>{doc.title}</li>
                ))}
              </ul>
            ) : null}
            <p className="mt-4 text-sm text-[#f0c4cc]">Сайт производителя в справочнике не открывается.</p>
          </aside>
        </section>

        <section id="consult" className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#161616] px-5 py-6 text-white">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#f0c4cc] uppercase">Подбор по параметрам</p>
            <h2 className="mt-2 font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">Нужно подобрать модель под задачу?</h2>
            <p className="mt-2 max-w-xl text-sm text-white/70">Запрос получает справочник, не завод. Это не покупка.</p>
          </div>
          <button type="button" className="inline-flex h-12 items-center rounded-full bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-hover" onClick={() => setLead({ intent: "pick", categoryId: query.type })}>
            Подобрать модель
          </button>
        </section>
      </main>

      <footer className="bg-[#111] text-white/75">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm md:grid-cols-3">
          <div>
            <p className="font-display font-extrabold text-white">Котлы<span className="text-[#f0c4cc]">.pro</span></p>
            <p className="mt-2">Независимый каталог. Не является офертой и сайтом завода.</p>
          </div>
          <div className="grid gap-2">
            <Link to="/politika" className="hover:text-white">Политика обработки данных</Link>
            <Link to="/soglasie" className="hover:text-white">Согласие на обращение</Link>
          </div>
          <p>Логотип производителя в интерфейсе не используется.</p>
        </div>
      </footer>

      <SeriesDialog
        series={activeSeries}
        maker={maker}
        onClose={closeSeries}
        onConsult={(sizeId) => {
          if (!activeSeries) return;
          setLead({ intent: "kp", seriesId: activeSeries.id, sizeId, categoryId: activeSeries.categoryId });
        }}
        onAnalogs={() => activeSeries && setAnalogsFor(activeSeries)}
      />

      <AnalogsDialog series={analogsFor} sourceSlug={slug} onClose={() => setAnalogsFor(null)} />

      <Dialog.Root open={lead != null} onOpenChange={(open) => !open && setLead(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-3xl bg-surface p-4 shadow-lg md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:w-full md:max-w-xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl">
            <div className="mb-3 flex items-start justify-between gap-3">
              <Dialog.Title className="font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">Консультация по серии</Dialog.Title>
              <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-lg bg-chip" aria-label="Закрыть">
                <X className="size-5" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Форма инженерной консультации. Не заказ и не покупка.</Dialog.Description>
            {lead ? <LeadForm key={`${lead.seriesId ?? ""}-${lead.sizeId ?? ""}`} context={lead} submitLabel="Получить консультацию" /> : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function flattenModels(list: Series[]) {
  return list.flatMap((series) => {
    if (series.sizes.length === 0) {
      return [{ key: series.id, series, sizeId: undefined as string | undefined, title: series.name, main: primarySpec(series).value, sub: series.kind }];
    }
    return series.sizes.map((size) => ({
      key: size.id,
      series,
      sizeId: size.id,
      title: size.name,
      main: size.powerKw != null ? formatKw(size.powerKw) : size.steamKgH != null ? formatSteam(size.steamKgH) : "Не указано",
      sub: size.powerKw != null && size.powerKw >= 1000 ? `${size.powerKw.toLocaleString("ru-RU")} кВт` : series.kind,
    }));
  });
}

function MissingSeries({ brand, openInitially }: { brand: string; openInitially: boolean }) {
  const tasks: { id: CategoryId; title: string; unit: "kw" | "tph" }[] = [
    { id: "water", title: "Водогрейный", unit: "kw" },
    { id: "steam", title: "Паровой", unit: "tph" },
    { id: "oil", title: "Термомасло", unit: "kw" },
    { id: "air", title: "Воздух", unit: "kw" },
    { id: "auto", title: "Горелка", unit: "kw" },
  ];
  const [open, setOpen] = useState(openInitially);
  const [task, setTask] = useState<CategoryId>("water");
  const [fuel, setFuel] = useState<FuelId | "">("");
  const [amount, setAmount] = useState("");
  const [hits, setHits] = useState<ReturnType<typeof analogsForRequest> | null>(null);
  const unit = tasks.find((item) => item.id === task)?.unit ?? "kw";

  function run(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount.replace(",", "."));
    const number = Number.isFinite(value) && value > 0 ? value : null;
    setHits(
      analogsForRequest({
        categoryId: task,
        fuel: fuel || null,
        powerKw: unit === "kw" ? number : null,
        steamKgH: unit === "tph" && number != null ? Math.round(number * 1000) : null,
      }),
    );
  }

  return (
    <div id="analogs" className="mt-6 rounded-3xl border-2 border-accent bg-surface p-6">
      <p className="font-display text-2xl leading-none font-extrabold tracking-[-0.04em]">Информация на сайте производителя не предоставлена</p>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        У {brand} в открытых страницах нет ряда, который можно перенести. Модель справочник не назначает.
      </p>
      <button
        type="button"
        className="mt-5 inline-flex h-14 items-center rounded-sm bg-accent px-6 text-base font-extrabold text-on-accent ring-2 ring-ink"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        Подобрать аналоги
      </button>
      {open ? (
        <form className="mt-5 grid gap-3 border-t border-line pt-5" onSubmit={run}>
          <p className="text-sm text-muted">Что нужно было от {brand}. По этим цифрам ниже — открытые серии других заводов. Это не замена и не расчёт.</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="grid gap-1 text-sm">
              Задача
              <select className="h-12 rounded-sm border border-line bg-surface px-3" value={task} onChange={(event) => setTask(event.target.value as CategoryId)}>
                {tasks.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              Топливо
              <select className="h-12 rounded-sm border border-line bg-surface px-3" value={fuel} onChange={(event) => setFuel(event.target.value as FuelId | "")}>
                <option value="">Не указано</option>
                {fuels.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              {unit === "tph" ? "Пар, т/ч" : "Мощность, кВт"}
              <input
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={unit === "tph" ? "например 10" : "например 3000"}
                className="h-12 rounded-sm border border-line bg-surface px-3"
              />
            </label>
          </div>
          <button type="submit" className="inline-flex h-12 w-fit items-center rounded-sm bg-ink px-5 text-sm font-semibold text-bg">
            Показать открытые серии
          </button>
          {hits ? (
            hits.length === 0 ? (
              <p className="text-sm">В открытом справочнике по этим цифрам серий нет.</p>
            ) : (
              <ul className="grid gap-2">
                {hits.map((item) => (
                  <li key={`${item.slug}-${item.series.id}`} className="rounded-2xl border border-line px-3 py-3">
                    <p className="text-xs font-semibold uppercase">{item.maker}</p>
                    <p className="mt-1 font-display text-xl leading-none font-extrabold tracking-[-0.04em]">{item.series.name}</p>
                    <p className="mt-2 text-sm text-muted">
                      {primarySpec(item.series).label}: {primarySpec(item.series).value}
                    </p>
                    <p className="mt-1 text-xs text-muted">{item.note}</p>
                    <Link to="/manufacturers/$slug" params={{ slug: item.slug }} search={{ series: item.series.id }} className="mt-2 inline-flex text-sm font-semibold">
                      Открыть серию
                    </Link>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </form>
      ) : null}
    </div>
  );
}

function SeriesCard({
  series,
  eager,
  onOpen,
  onConsult,
  onAnalogs,
}: {
  series: Series;
  eager: boolean;
  onOpen: () => void;
  onConsult: () => void;
  onAnalogs: () => void;
}) {
  const spec = primarySpec(series);
  const second = series.categoryId === "steam" ? null : { label: "Температура", value: formatTemp(series.tempMaxC) };
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <img
          src={series.image}
          alt={`Иллюстрация серии ${series.name}. Внешний вид и комплектация уточняются.`}
          width={1600}
          height={1200}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-video w-full object-cover"
        />
        <div className="p-4 pb-3">
          <p className="text-xs font-semibold text-ink uppercase">
            Серия{series.sizes.length ? ` · ${series.sizes.length}` : ""}
          </p>
          <h2 className="mt-1 font-display text-3xl leading-[0.92] font-extrabold tracking-[-0.04em] text-balance">{series.name}</h2>
          <p className="mt-1 text-sm leading-snug text-muted">{series.kind}</p>
          <dl className="mt-3 grid gap-2 text-sm">
            <div className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-muted">{spec.label}</dt>
              <dd className="text-right font-medium tabular-nums">{spec.value}</dd>
            </div>
            {second ? (
              <div className="flex items-start justify-between gap-3">
                <dt className="shrink-0 text-muted">{second.label}</dt>
                <dd className="text-right font-medium">{second.value}</dd>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <dt className="shrink-0 text-muted">Исполнение</dt>
                <dd className="max-w-[65%] text-right font-medium">{series.feature}</dd>
              </div>
            )}
            <div className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-muted">Топливо</dt>
              <dd className="max-w-[65%] text-right font-medium">{series.fuels.length ? series.fuels.map(fuelTitle).join(", ") : "Уточняется"}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-muted">Иллюстрация серии. Внешний вид на странице завода может отличаться. Стоимость здесь не указывается.</p>
        </div>
      </button>
      <div className="mt-auto flex shrink-0 flex-col gap-2 border-t border-line p-4">
        <button type="button" className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-3 text-sm leading-none font-semibold text-on-accent hover:bg-accent-hover" onClick={onConsult}>
          Консультация по серии
        </button>
        <button type="button" className="inline-flex h-11 items-center justify-center rounded-sm bg-ink px-3 text-sm leading-none font-semibold text-bg hover:bg-ink/80" onClick={onAnalogs}>
          Подобрать аналоги
        </button>
        <button type="button" className="inline-flex h-11 items-center justify-center rounded-sm bg-chip px-3 text-sm leading-none font-semibold" onClick={onOpen}>
          Характеристики
        </button>
      </div>
    </article>
  );
}

function hideManufacturerSites(text: string) {
  const next = text
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/gi, "")
    .replace(/\s+на\s*,/gi, "")
    .replace(/,\s*на него ведёт\s*\./gi, ".")
    .replace(/Источник:\s*\./gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .replace(/([.!?])\s*\./g, "$1")
    .trim();
  return next.replace(/[.\s]+$/, "");
}

function SeriesDialog({
  series,
  maker,
  onClose,
  onConsult,
  onAnalogs,
}: {
  series: Series | undefined;
  maker: ReturnType<typeof manufacturerBySlug>;
  onClose: () => void;
  onConsult: (sizeId?: string) => void;
  onAnalogs: () => void;
}) {
  return (
    <Dialog.Root open={Boolean(series)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-dvh overflow-y-auto rounded-t-sm bg-surface p-4 md:inset-x-auto md:top-8 md:bottom-8 md:left-1/2 md:w-full md:max-w-3xl md:-translate-x-1/2 md:rounded-sm">
          {series ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Dialog.Title className="text-2xl font-semibold">{series.name}</Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-muted">{series.kind}. Серия, не один типоразмер.</Dialog.Description>
                </div>
                <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-lg bg-chip" aria-label="Закрыть">
                  <X className="size-5" />
                </Dialog.Close>
              </div>
              <img src={series.image} alt="" width={1600} height={1200} className="mt-4 aspect-video w-full rounded-xl object-cover" />
              <p className="mt-2 text-xs text-muted">Иллюстрация серии; внешний вид и комплектация уточняются. Визуализация не является обмером.</p>
              <p className="mt-4 text-pretty">{series.summary}</p>
              {maker ? <FactoryCard maker={maker} /> : null}
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <Spec label="Мощность" value={formatPowerRange(series.powerMinKw, series.powerMaxKw)} />
                <Spec label="Пар" value={formatSteamRange(series.steamMinKgH, series.steamMaxKgH)} />
                <Spec label="Температура" value={formatTemp(series.tempMaxC)} />
                <Spec label="Давление" value={series.pressureNote ?? "Уточняется"} />
                <Spec label="Топливо" value={series.fuels.length ? series.fuels.map(fuelTitle).join(", ") : "Уточняется"} />
                <Spec label="Исполнение" value={series.feature} />
              </dl>
              {series.extra ? (
                <p className="mt-3 text-sm text-muted">
                  {[hideManufacturerSites(series.extra), "Взято с оф. сайта производителя."].filter(Boolean).join(" ")}
                </p>
              ) : null}
              <h3 className="mt-6 text-lg font-semibold">Типоразмеры</h3>
              {series.sizes.length === 0 ? (
                <p className="mt-2 text-sm text-muted">{series.sizesNote ?? "Перечень типоразмеров в открытом источнике не разложен. Справочник модель не назначает."}</p>
              ) : (
                <div className="mt-2 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[36rem] text-left text-sm">
                    <thead className="bg-chip text-muted">
                      <tr>
                        <th className="px-3 py-2 font-medium">Обозначение</th>
                        <th className="px-3 py-2 font-medium">Параметр</th>
                        <th className="px-3 py-2 font-medium" />
                      </tr>
                    </thead>
                    <tbody>
                      {series.sizes.map((size) => (
                        <tr key={size.id} className="border-t border-line">
                          <td className="px-3 py-2 font-medium">{size.name}</td>
                          <td className="px-3 py-2 tabular-nums">
                            {size.powerKw != null ? formatKw(size.powerKw) : size.steamKgH != null ? formatSteam(size.steamKgH) : "Уточняется"}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <button type="button" className="h-11 px-2 text-sm font-semibold text-ink" onClick={() => onConsult(size.id)}>
                              Консультация
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {series.sizesNote && series.sizes.length > 0 ? <p className="mt-2 text-sm text-muted">{series.sizesNote}</p> : null}
              <button type="button" className="mt-4 inline-flex h-12 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-on-accent" onClick={onAnalogs}>
                Подобрать аналоги
              </button>
              <button type="button" className="mt-2 inline-flex h-12 items-center rounded-lg bg-ink px-5 text-sm font-semibold text-bg" onClick={() => onConsult(undefined)}>
                Инженерное решение по серии
              </button>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function AnalogsDialog({ series, sourceSlug, onClose }: { series: Series | null; sourceSlug: string; onClose: () => void }) {
  const hits = series ? similarSeries(series, sourceSlug) : [];
  return (
    <Dialog.Root open={series != null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/70" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-[70] max-h-dvh overflow-y-auto rounded-t-3xl bg-surface p-4 shadow-lg md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:w-full md:max-w-xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">Похожие серии</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-muted">
                Только открытые карточки с той же задачей. Совпадение диапазона и топлива указано, если оно есть в справочнике. Это не замена и не расчёт.
              </Dialog.Description>
            </div>
            <Dialog.Close className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-chip" aria-label="Закрыть">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          {hits.length === 0 ? (
            <p className="text-sm">В открытом справочнике схожих серий нет.</p>
          ) : (
            <ul className="grid gap-2">
              {hits.map((item) => (
                <li key={`${item.slug}-${item.series.id}`} className="rounded-2xl border border-line px-3 py-3">
                  <p className="text-xs font-semibold text-ink uppercase">{item.maker}</p>
                  <p className="mt-1 font-display text-xl leading-none font-extrabold tracking-[-0.04em]">{item.series.name}</p>
                  <p className="mt-2 text-sm text-muted">
                    {primarySpec(item.series).label}: {primarySpec(item.series).value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{item.note}</p>
                  <Link
                    to="/manufacturers/$slug"
                    params={{ slug: item.slug }}
                    search={{ series: item.series.id }}
                    className="mt-2 inline-flex text-sm font-semibold text-ink"
                    onClick={onClose}
                  >
                    Открыть серию
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-chip px-3 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function isFuel(value: string | undefined): value is FuelId {
  return fuels.some((item) => item.id === value);
}
function isPower(value: string | undefined): value is PowerBand {
  return powerBands.some((item) => item.id === value);
}
function isSteam(value: string | undefined): value is SteamBand {
  return steamBands.some((item) => item.id === value);
}
