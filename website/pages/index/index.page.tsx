import { getBaseURL } from "../constants";
import { IndexPageProps } from "./types";
import { PageList, PageListEntry } from "../../components/pagelist";

export { Page }

function Page(props: IndexPageProps) {
  const worldPageListEntries: PageListEntry[] = props.world.sort((a, b) => a.country_code.localeCompare(b.country_code)).map((entry) => {
    const url = new URL(`/world/${entry.country_code.toLowerCase()}/`, getBaseURL()).href;
    return {
      short_name: entry.country_code,
      long_name: `${entry.name_jp}、${entry.capital_jp} / ${entry.name_en}, ${entry.capital_en}`,
      href: url,
    }
  });
  const japanPageListEntries: PageListEntry[] = props.japan.sort((a, b) => a.prefcode.localeCompare(b.prefcode)).map((entry) => {
    const url = new URL(`/japan/${entry.prefcode.toLowerCase()}/`, getBaseURL()).href;
    return {
      short_name: entry.prefname_jp,
      long_name: `[${entry.prefcode}] ${entry.prefname_jp}, ${entry.capital_jp} / ${entry.prefname_en}`,
      href: url,
    }
  });
  return (
    <>
      <h1>世界と日本の日の出と日の入りカレンダー</h1>
      <h2>世界</h2>
      <PageList entries={worldPageListEntries} />
      <h2>日本</h2>
      <PageList entries={japanPageListEntries} />
    </>
  )
}
