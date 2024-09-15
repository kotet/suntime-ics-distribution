import { PageContextServer } from "../../renderer/types";
import { BasePath, SiteTitle, getBaseURL } from "../constants";
import { WorldJSONPath } from "../constants.server";
import { WorldJSONEntry, WorldPageProps } from "./types";
import fs from "fs";

export async function prerender(): Promise<string[]> {
  const worldJson = fs.readFileSync(WorldJSONPath, "utf-8");
  const entries = JSON.parse(worldJson) as WorldJSONEntry[];

  return entries.map((entry) => `/world/${entry.country_code.toLowerCase()}/`);
}

export async function onBeforeRender(pageContext: PageContextServer) {
  const worldJson = fs.readFileSync(WorldJSONPath, "utf-8");
  const entries = JSON.parse(worldJson) as WorldJSONEntry[];
  const code = pageContext.routeParams.country_code.toLowerCase();
  const entry = entries.find(prop => prop.country_code.toLowerCase() === code);
  if (!entry) {
    throw new Error(`not found: ${code}`);
  }
  const pageProps: WorldPageProps = {
    entry,
    breadcrumbs: [
      { href: new URL(BasePath, getBaseURL()).href, name: SiteTitle },
      { name: "世界" },
      { name: entry.name_jp },
    ]
  }
  return {
    pageContext: { pageProps }
  }
}

export function getDocumentProps(props: WorldPageProps) {
  return {
    title: `${props.entry.capital_jp}の日の出と日の入り`,
    description: `${props.entry.name_jp}の${props.entry.capital_jp}の日の出と日の入りのカレンダー。Googleカレンダーなどにインポートして使えます`,
  }
}
