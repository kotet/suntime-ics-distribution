import { WorldJSONEntry } from "../world/types";
import fs from "fs";
import { JapanJSONPath, WorldJSONPath } from "../constants.server";
import { JapanJSONEntry } from "../japan/types";

export const documentProps = {
  title: '世界と日本の日の出と日の入りカレンダー',
  description: '世界と日本の日の出と日の入りカレンダー',
};

export async function prerender() {
  return {
    url: `/`
  }
}

export async function onBeforeRender() {
  const worldJson = fs.readFileSync(WorldJSONPath, "utf-8");
  const worldEntries = JSON.parse(worldJson) as WorldJSONEntry[];
  const japanJson = fs.readFileSync(JapanJSONPath, "utf-8");
  const japanEntries = JSON.parse(japanJson) as JapanJSONEntry[];
  return {
    pageContext: {
      pageProps: {
        world: worldEntries,
        japan: japanEntries,
      },
    }
  }
}
