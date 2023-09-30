import { PageProps } from "../../renderer/types";

export type WorldPageProps = {
  entry: WorldJSONEntry,
} & PageProps;

export type WorldJSONEntry = {
  country_code: string;
  name_jp: string;
  capital_jp: string;
  name_en: string;
  capital_en: string;
  lat: number;
  lon: number;
};
