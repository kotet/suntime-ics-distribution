export type JapanPageProps = JapanJSONEntry;

export type JapanJSONEntry = {
  prefcode: string;
  prefname_jp: string;
  prefname_sjp: string;
  prefname_en: string;
  prefname_sen: string;
  capital_jp: string;
  capital_address: string;
  capital_lat: number;
  capital_lon: number;
};
