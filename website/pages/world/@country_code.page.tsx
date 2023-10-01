import { CalendarViewer } from "../../components/calendar";
import { CopyableLink } from "../../components/copyable_link";
import { GoogleMap } from "../../components/google_map";
import { BasePath, getBaseURL } from "../constants"
import { WorldPageProps } from "./types"
import { Group, Table, Text, Title } from "@mantine/core";
import { weekAfter } from "../../utils/date";
import { Disclaimer } from "../../components/disclaimer";

export function Page({ entry }: WorldPageProps) {
  const urlSunriseSunset = new URL(`${BasePath}./data/ics/world/sunrise-sunset/${entry.country_code.toLowerCase()}-sunrise-sunset.ics`, getBaseURL());
  const urlSunrise = new URL(`${BasePath}./data/ics/world/sunrise/${entry.country_code.toLowerCase()}-sunrise.ics`, getBaseURL());
  const urlSunset = new URL(`${BasePath}./data/ics/world/sunset/${entry.country_code.toLowerCase()}-sunset.ics`, getBaseURL());
  return (
    <>
      <Title>[{entry.country_code}]: {entry.name_jp}、{entry.capital_jp}</Title>
      <Text>{entry.name_en}, {entry.capital_en}</Text>
      <Table style={{
        maxWidth: 800,
      }} withColumnBorders>
        <tbody>
          <tr>
            <td>日の出</td>
            <td><CopyableLink href={urlSunriseSunset} /></td>
          </tr>
          <tr>
            <td>日の入り</td>
            <td><CopyableLink href={urlSunrise} /></td>
          </tr>
          <tr>
            <td>日の出と日の入り</td>
            <td><CopyableLink href={urlSunset} /></td>
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
