import { CalendarViewer } from "../../components/calendar";
import { CopyableLink } from "../../components/copyable_link";
import { GoogleMap } from "../../components/google_map";
import { BasePath, getBaseURL } from "../constants"
import { WorldPageProps } from "./types"
import { Group, Table, Text, Title } from "@mantine/core";
import { weekAfter } from "../../utils/date";
import { Disclaimer } from "../../components/disclaimer";
import { useTranslation } from "react-i18next";

export function Page({ entry }: WorldPageProps) {
  const urlSunriseSunset = new URL(`${BasePath}./data/ics/world/sunrise-sunset/${entry.country_code.toLowerCase()}-sunrise-sunset.ics`, getBaseURL());
  const urlSunrise = new URL(`${BasePath}./data/ics/world/sunrise/${entry.country_code.toLowerCase()}-sunrise.ics`, getBaseURL());
  const urlSunset = new URL(`${BasePath}./data/ics/world/sunset/${entry.country_code.toLowerCase()}-sunset.ics`, getBaseURL());
  const { t } = useTranslation();
  return (
    <>
      <Title>{t('country_page_title_main', entry)}</Title>
      <Text>{t('country_page_title_sub', entry)}</Text>
      <Table style={{
        maxWidth: 1200,
      }} withColumnBorders>
        <tbody>
          <tr>
            <td>{t('sunrise')}</td>
            <td><CopyableLink href={urlSunrise} /></td>
          </tr>
          <tr>
            <td>{t('sunset')}</td>
            <td><CopyableLink href={urlSunset} /></td>
          </tr>
          <tr>
            <td>{t('sunrise_sunset')}</td>
            <td><CopyableLink href={urlSunriseSunset} /></td>
          </tr>
        </tbody>
      </Table>
      <Group>
        <GoogleMap lat={entry.lat} lng={entry.lon} zoom={8} />
        <CalendarViewer sunriseURL={urlSunrise} sunsetURL={urlSunset} initialStart={new Date()} initialEnd={weekAfter(new Date(), 3)} />
      </Group>
      <Disclaimer />
    </>
  )
}
