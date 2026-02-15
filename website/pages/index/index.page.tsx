import { BasePath, getBaseURL } from "../constants";
import { IndexPageProps } from "./types";
import { PageList, PageListEntry } from "../../components/page_list";
import { useTranslation } from "react-i18next";

export { Page }

function country_code_to_emoji(code: string): string {
  const codePoint = code.toUpperCase().split('').map((c) => 0x1F1E6 + c.charCodeAt(0) - 'A'.charCodeAt(0));
  return String.fromCodePoint(...codePoint);
}

function Page(props: IndexPageProps) {
  const { t } = useTranslation();
  const worldPageListEntries: PageListEntry[] = props.world.sort((a, b) => a.country_code.localeCompare(b.country_code)).map((entry) => {
    const url = new URL(`${BasePath}./world/${entry.country_code.toLowerCase()}/`, getBaseURL()).href;
    return {
      short_name: `${country_code_to_emoji(entry.country_code)} ${entry.country_code}`,
      long_name: t('country_long_name', entry),
      href: url,
    }
  });
  const japanPageListEntries: PageListEntry[] = props.japan.sort((a, b) => Number.parseInt(a.prefcode) - Number.parseInt(b.prefcode)).map((entry) => {
    const url = new URL(`${BasePath}./japan/${entry.prefcode.toLowerCase()}/`, getBaseURL()).href;
    return {
      short_name: entry.name_jp,
      long_name: t('japan_long_name', {...entry, prefcode_pad: entry.prefcode.padStart(2, '0')}),
      href: url,
    }
  });
  return (
    <>
      <h2>{t('world')}</h2>
      <PageList entries={worldPageListEntries} />
      <h2>{t('japan')}</h2>
      <PageList entries={japanPageListEntries} />
    </>
  )
}
