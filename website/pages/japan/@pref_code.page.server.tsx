import fs from "fs";
import { JapanJSONPath } from "../constants.server";
import { JapanPageProps } from "./types";
import { PageContextServer } from "../../renderer/types";

export async function prerender(): Promise<string[]> {
  const japanJson = fs.readFileSync(JapanJSONPath, "utf-8");
  const entries = JSON.parse(japanJson) as JapanPageProps[];

  return entries.map((entry) => `/japan/${entry.prefcode.toLowerCase()}/`);
}

export async function onBeforeRender(pageContext: PageContextServer) {
  const japanJson = fs.readFileSync(JapanJSONPath, "utf-8");
  const entries = JSON.parse(japanJson) as JapanPageProps[];
  const code = pageContext.routeParams.pref_code.toLowerCase();
  const props = entries.find(prop => prop.prefcode.toLowerCase() === code);
  if (!props) {
    throw new Error(`not found: ${code}`);
  }
  return {
    pageContext: {
      pageProps: props
    }
  }
}

export function getDocumentProps(pageProps: JapanPageProps) {
  return {
    title: `${pageProps.prefname_jp}、${pageProps.capital_jp}の日の出と日の入り`,
    description: `${pageProps.prefname_jp}、${pageProps.capital_jp}の日の出と日の入りカレンダー`,
  }
}
