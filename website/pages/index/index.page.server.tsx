import { WorldJSONEntry } from "../world/types";
import fs from "fs";
import { JapanJSONPath, WorldJSONPath } from "../constants.server";
import { JapanJSONEntry } from "../japan/types";
import i18n from "../../utils/i18n";

export function getDocumentProps() {
  const t = i18n.t;
  return {
    title: t('site_title_full'),
    description: t('site_description'),
  }
}

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
