import { DBCategory, DBItem } from "../../types";

// Encapsulated, private configs
const _DB_CONFIGS = {
  preferences: { pass_key: "c_01.dat", store: "c_02.dat" },
  data: {
    employees: "data_01.dat",
    vacations: "data_02.dat",
    absences: "data_03.dat",
  },
  history: { vacations: "hist_02.dat", absences: "hist_03.dat" },
  logs: { app: "app.log", error: "error.log" },
} as const;

const _DB_PATHS = {
  preferences: "/userData/cfg/",
  data: "/userData/data/",
  history: "/userData/hist/",
} as const;

// Read-only getter
export function getDBPath(category: DBCategory, item: DBItem) {
  const basePath = _DB_PATHS[category];
  const fileName =
    _DB_CONFIGS[category][item as keyof (typeof _DB_CONFIGS)[typeof category]];
  return `${basePath}${fileName}`;
}
