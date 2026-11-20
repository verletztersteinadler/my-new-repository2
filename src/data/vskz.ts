import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. Каталог vskz.ru. Исполнения «Лайт» той же мощности отдельно не заведены. Модульные котельные, дымоходы, дробилки, золоудаление и комплекты автоматизации не внесены.";

function line(id: string, name: string, steps: number[], kind: string, feature: string): Series {
  const sizes: Size[] = steps.map((kw) => ({ id: `${id}-${kw}`, name: `${name} ${kw}`, powerKw: kw, steamKgH: null }));
  return {
    id,
    name: `ВСКЗ-${name}`,
    categoryId: "water",
    kind,
    image: "/catalog/solid.jpg",
    summary: feature,
    powerMinKw: steps[0],
    powerMaxKw: steps[steps.length - 1],
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"],
    feature,
    extra: `${checked} Сайт называет котлы твёрдотопливными. Уголь и пеллеты по моделям не разведены. Температура и давление на странице каталога не указаны.`,
    sizes,
    sizesNote: null,
    aliases: [name.toLowerCase()],
  };
}

export const vskzCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const vskzDocuments = [{ title: "Каталог vskz.ru" }];
export const vskzSeries: Series[] = [
  line("vskz-eko", "ЭКО", [14, 18, 24, 32, 40, 50, 60, 80, 100, 130, 150, 200], "Автоматический", "14–200 кВт"),
  line("vskz-light", "ЛАЙТ", [15, 21, 28], "Автоматический", "15–28 кВт"),
  line("vskz-plus", "ЭКО Плюс", [15, 20, 26, 34, 44, 54, 65, 85, 110, 140, 160, 210], "Автоматический", "15–210 кВт"),
  line("vskz-lux", "ЛЮКС", [20, 30, 40, 50, 60], "Автоматический", "20–60 кВт"),
  line("vskz-compact", "КОМПАКТ", [20, 26, 34, 44, 54, 65, 85], "Автоматический", "20–85 кВт"),
  line("vskz-duo", "ДУО", [270, 330, 400, 500, 600, 800], "Автоматический", "270–800 кВт"),
  line("vskz-prom", "ПРОМ", [65, 110, 200, 270, 400, 600, 800, 1000], "Автоматический, поршневая подача", "65–1000 кВт"),
  line("vskz-smart", "СМАРТ", [20, 30, 40, 50, 60], "Автоматический", "20–60 кВт"),
  line("vskz-vert", "ВЕРТИКАЛ", [20, 26, 34, 44, 54], "Полуавтоматический", "20–54 кВт"),
  line("vskz-comfort", "КОМФОРТ", [14, 24, 32, 42, 60, 80, 100, 150, 200, 300], "Полуавтоматический", "14–300 кВт"),
];
