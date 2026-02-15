import { useTranslation } from "react-i18next";
import { PageContextServer } from "../../renderer/types";
import { BasePath, getBaseURL } from "../constants";
import { WorldJSONPath } from "../constants.server";
import { WorldJSONEntry, WorldPageProps } from "./types";
import fs from "fs";
import i18n from "../../utils/i18n";

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
  const t = i18n.t;
  if (!entry) {
    throw new Error(`not found: ${code}`);
  }
  const pageProps: WorldPageProps = {
    entry,
    breadcrumbs: [
      { href: new URL(BasePath, getBaseURL()).href, i18n_key: 'site_title_short' },
      { i18n_key: 'world' },
      { i18n_key: 'country_name' , values: entry },
    ]
  }
  return {
    pageContext: { pageProps }
  }
}

export function getDocumentProps(props: WorldPageProps) {
  const t = i18n.t;
  return {
    title: t('country_props_title', {
      name_jp: props.entry.name_jp,
      name_en: props.entry.name_en,
      capital_jp: props.entry.capital_jp,
      capital_en: props.entry.capital_en,
    }),
    description: t('country_props_description', {
      name_jp: props.entry.name_jp,
      name_en: props.entry.name_en,
      capital_jp: props.entry.capital_jp,
      capital_en: props.entry.capital_en,
    }),
  }
}
