import fs from "fs";
import { JapanJSONPath } from "../constants.server";
import { JapanJSONEntry, JapanPageProps } from "./types";
import { PageContextServer } from "../../renderer/types";
import { BasePath, SiteTitle, getBaseURL } from "../constants";

export async function prerender(): Promise<string[]> {
  const japanJson = fs.readFileSync(JapanJSONPath, "utf-8");
  const entries = JSON.parse(japanJson) as JapanJSONEntry[];

  return entries.map((entry) => `/japan/${entry.prefcode.toLowerCase()}/`);
}

export async function onBeforeRender(pageContext: PageContextServer) {
  const japanJson = fs.readFileSync(JapanJSONPath, "utf-8");
  const entries = JSON.parse(japanJson) as JapanJSONEntry[];
  const code = pageContext.routeParams.pref_code.toLowerCase();
  const entry = entries.find(entry => entry.prefcode.toLowerCase() === code);
  if (!entry) {
    throw new Error(`not found: ${code}`);
  }
  const props: JapanPageProps = {
    entry,
    breadcrumbs: [
      {href: new URL(BasePath, getBaseURL()).href, name: SiteTitle},
      {name: "日本"},
      {name: entry.name_jp},
    ]
  }
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
    title: `${pageProps.entry.name_jp}庁の日の出と日の入り`,
    description: `${pageProps.entry.name_jp}の日の出と日の入りカレンダー`,
  }
}
