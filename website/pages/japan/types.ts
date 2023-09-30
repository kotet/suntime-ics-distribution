import { PageProps } from "../../renderer/types";

export type JapanPageProps = {
  entry: JapanJSONEntry,
} & PageProps;

export type JapanJSONEntry = {
  prefcode: string;
  name_jp: string;
  name_sjp: string;
  name_en: string;
  name_sen: string;
  capital_lat: number;
  capital_lon: number;
};
