import fs from "fs";
import path from "path";
import { app } from "electron";

type Category = "data" | "history" | "preferences";

const CACHE: Record<string, any> = {};

const PATHS = {
  data: path.join(app.getPath("userData"), "data"),
  history: path.join(app.getPath("userData"), "hist"),
  preferences: path.join(app.getPath("userData"), "cfg"),
};

function filePath(category: Category, name: string) {
  return path.join(PATHS[category], `${name}.dat`);
}

function load(category: Category, name: string) {
  const key = `${category}/${name}`;
  if (CACHE[key]) return CACHE[key];

  const fp = filePath(category, name);

  if (!fs.existsSync(fp)) {
    CACHE[key] = {};
    return CACHE[key];
  }

  const raw = fs.readFileSync(fp, "utf8");
  CACHE[key] = JSON.parse(raw);

  return CACHE[key];
}

function save(category: Category, name: string) {
  const key = `${category}/${name}`;
  const fp = filePath(category, name);

  fs.writeFileSync(fp, JSON.stringify(CACHE[key], null, 2));
}

export const dataStore = {
  get(category: Category, name: string) {
    return load(category, name);
  },

  set(category: Category, name: string, data: any) {
    const key = `${category}/${name}`;
    CACHE[key] = data;
    save(category, name);
  },

  update(category: Category, name: string, updater: (data: any) => any) {
    const data = load(category, name);
    const updated = updater(data);

    const key = `${category}/${name}`;
    CACHE[key] = updated;

    save(category, name);

    return updated;
  },
};