import { Group, Table } from "@mantine/core";
import { JapanPageProps } from "./types";
import { CopyableLink } from "../../components/copyable_link";
import { BasePath, getBaseURL } from "../constants";
import { GoogleMap } from "../../components/google_map";
import { CalendarViewer } from "../../components/calendar";
import { weekAfter } from "../../utils/date";
import { Disclaimer } from "../../components/disclaimer";
import { useTranslation } from "react-i18next";

export function Page({ entry }: JapanPageProps) {
  const urlSunriseSunset = new URL(
    `${BasePath}./data/ics/japan/sunrise-sunset/${entry.prefcode.toLowerCase()}-sunrise-sunset.ics`,
    getBaseURL(),
  );
  const urlSunrise = new URL(
    `${BasePath}./data/ics/japan/sunrise/${entry.prefcode.toLowerCase()}-sunrise.ics`,
    getBaseURL(),
  );
  const urlSunset = new URL(
    `${BasePath}./data/ics/japan/sunset/${entry.prefcode.toLowerCase()}-sunset.ics`,
    getBaseURL(),
  );

  const { t } = useTranslation();

  return (
    <>
      <h1>
        [{entry.prefcode}]: {entry.name_jp}
      </h1>
      <p>{entry.name_en}, Japan</p>
      <Table
        style={{
          maxWidth: 1200,
        }}
      >
        <tbody>
          <tr>
            <td>{t("sunrise")}</td>
            <td>
              <CopyableLink href={urlSunrise}></CopyableLink>
            </td>
          </tr>
          <tr>
            <td>{t("sunset")}</td>
            <td>
              <CopyableLink href={urlSunset}></CopyableLink>
            </td>
          </tr>
          <tr>
            <td>{t("sunrise_sunset")}</td>
            <td>
              <CopyableLink href={urlSunriseSunset}></CopyableLink>
            </td>
          </tr>
        </tbody>
      </Table>
      <Group py={20}>
        <GoogleMap
          lat={entry.capital_lat}
          lng={entry.capital_lon}
          q={`${entry.name_jp}庁`}
          zoom={10}
        />
        <CalendarViewer
          sunriseURL={urlSunrise}
          sunsetURL={urlSunset}
          initialStart={new Date()}
          initialEnd={weekAfter(new Date(), 3)}
        />
      </Group>
      <Disclaimer />
    </>
  );
}
