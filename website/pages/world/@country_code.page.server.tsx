import { PageContextServer } from "../../renderer/types";
import { WorldJSONPath } from "../constants.server";
import { WorldPageProps } from "./types";
import fs from "fs";

export async function prerender(): Promise<string[]> {
  const worldJson = fs.readFileSync(WorldJSONPath, "utf-8");
  const entries = JSON.parse(worldJson) as WorldPageProps[];

  return entries.map((entry) => `/world/${entry.country_code.toLowerCase()}/`);
}

export async function onBeforeRender(pageContext: PageContextServer) {
  const worldJson = fs.readFileSync(WorldJSONPath, "utf-8");
  const entries = JSON.parse(worldJson) as WorldPageProps[];
  const code = pageContext.routeParams.country_code.toLowerCase();
  const props = entries.find(prop => prop.country_code.toLowerCase() === code);
  if (!props) {
    throw new Error(`not found: ${code}`);
  }
  return {
    pageContext: {
      pageProps: props
    }
  }
}

export function getDocumentProps(props: WorldPageProps) {
  return {
    title: `${props.capital_jp}の日の出と日の入り`,
    description: `${props.name_jp}の${props.capital_jp}の日の出と日の入りのカレンダー`,
  }
}
