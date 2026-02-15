import fs from "fs";
import { JapanJSONPath } from "../constants.server";
import { JapanJSONEntry, JapanPageProps } from "./types";
import { PageContextServer } from "../../renderer/types";
import { BasePath, getBaseURL } from "../constants";
import i18n from "../../utils/i18n";

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

  const t = i18n.t;

  if (!entry) {
    throw new Error(`not found: ${code}`);
  }
  const props: JapanPageProps = {
    entry,
    breadcrumbs: [
      {href: new URL(BasePath, getBaseURL()).href, i18n_key: 'site_title_short'},
      {i18n_key: 'japan'},
      {i18n_key: 'prefecture_name', values: entry},
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
    description: `${pageProps.entry.name_jp}の日の出と日の入りカレンダー。Googleカレンダーなどにインポートして使えます`,
  }
}
