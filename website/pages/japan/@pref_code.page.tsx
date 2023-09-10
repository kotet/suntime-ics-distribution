import { JapanPageProps } from "./types";

export function Page(props: JapanPageProps) {
  const urlSunriseSunset = `/data/ics/japan/sunrise-sunset/${props.prefcode.toLowerCase()}-sunrise-sunset.ics`;
  const urlSunrise = `/data/ics/japan/sunrise/${props.prefcode.toLowerCase()}-sunrise.ics`;
  const urlSunset = `/data/ics/japan/sunset/${props.prefcode.toLowerCase()}-sunset.ics`;
  return (
    <>
      <h1>[{props.prefcode}]: {props.prefname_jp}</h1>
      <p>{props.prefname_en}, Japan</p>
      <p>{props.capital_jp}: {props.capital_address}</p>
      <table>
        <tr>
          <td>日の出</td>
          <td><Link href={urlSunrise}></Link></td>
        </tr>
        <tr>
          <td>日の入り</td>
          <td><Link href={urlSunset}></Link></td>
        </tr>
        <tr>
          <td>日の出と日の入り</td>
          <td><Link href={urlSunriseSunset}></Link></td>
        </tr>
      </table>
    </>
  );
}

function Link(props: { href: string }) {
  return <a href={props.href}>{props.href}</a>
}
