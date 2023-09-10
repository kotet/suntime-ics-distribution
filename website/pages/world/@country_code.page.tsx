import { getBaseURL } from "../constants"
import { WorldPageProps } from "./types"


export function Page(props: WorldPageProps) {
  const urlSunriseSunset = new URL(`/data/ics/world/sunrise-sunset/${props.country_code.toLowerCase()}-sunrise-sunset.ics`, getBaseURL()).href;
  const urlSunrise = new URL(`/data/ics/world/sunrise/${props.country_code.toLowerCase()}-sunrise.ics`, getBaseURL()).href;
  const urlSunset = new URL(`/data/ics/world/sunset/${props.country_code.toLowerCase()}-sunset.ics`, getBaseURL()).href;
  return (
    <>
      <h1>[{props.country_code}]: {props.name_jp}、{props.capital_jp}</h1>
      <p>{props.capital_en}, {props.name_en}</p>
      <table>
        <tr>
          <td>日の出</td>
          <td><Link href={urlSunriseSunset} /></td>
        </tr>
        <tr>
          <td>日の入り</td>
          <td><Link href={urlSunrise} /></td>
        </tr>
        <tr>
          <td>日の出と日の入り</td>
          <td><Link href={urlSunset} /></td>
        </tr>
      </table>
    </>
  )
}

function Link(props: { href: string }) {
  return <a href={props.href}>{props.href}</a>
}
