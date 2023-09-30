import { Group, Table } from "@mantine/core";
import { JapanPageProps } from "./types";
import { CopyableLink } from "../../components/copyable_link";
import { getBaseURL } from "../constants";
import { GoogleMap } from "../../components/google_map";
import { CalendarViewer } from "../../components/calendar";
import { weekAfter } from "../../utils/date";
import { Disclaimer } from "../../components/disclaimer";

export function Page({ entry }: JapanPageProps) {
  const urlSunriseSunset = new URL(`/data/ics/japan/sunrise-sunset/${entry.prefcode.toLowerCase()}-sunrise-sunset.ics`, getBaseURL());
  const urlSunrise = new URL(`/data/ics/japan/sunrise/${entry.prefcode.toLowerCase()}-sunrise.ics`, getBaseURL());
  const urlSunset = new URL(`/data/ics/japan/sunset/${entry.prefcode.toLowerCase()}-sunset.ics`, getBaseURL());
  return (
    <>
      <h1>[{entry.prefcode}]: {entry.name_jp}</h1>
      <p>{entry.name_en}, Japan</p>
      <Table style={{
        maxWidth: 800,
      }}>
        <tbody>
          <tr>
            <td>日の出</td>
            <td><CopyableLink href={urlSunrise}></CopyableLink></td>
          </tr>
          <tr>
            <td>日の入り</td>
            <td><CopyableLink href={urlSunset}></CopyableLink></td>
          </tr>
          <tr>
            <td>日の出と日の入り</td>
            <td><CopyableLink href={urlSunriseSunset}></CopyableLink></td>
          </tr>
        </tbody>
      </Table>
      <Group py={20}>
        <GoogleMap lat={entry.capital_lat} lng={entry.capital_lon} q={`${entry.name_jp}庁`} zoom={10} />
        <CalendarViewer sunriseURL={urlSunrise} sunsetURL={urlSunset} initialStart={new Date()} initialEnd={weekAfter(new Date(), 3)} />
      </Group>
      <Disclaimer />
    </>
  );
}
