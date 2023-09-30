import React, { useEffect } from 'react';
import { GoogleMapsAPIKey } from '../pages/constants';

type GoogleMapProps = {
  lat: number;
  lng: number;
  zoom: number;
  q?: string;
};
export const GoogleMap: React.FC<GoogleMapProps> = (props: GoogleMapProps) => {
  const [width, setWidth] = React.useState<number>(600);
  const ref = React.useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const h = () => {
      if (ref.current === null) {
        setWidth(window.innerWidth);
      } else {
        setWidth(ref.current.parentElement?.clientWidth ?? window.innerWidth);
      }
    };
    h();
    window.addEventListener('resize', h);
    return () => {
      window.removeEventListener('resize', h);
    };
  }, []);
  return <iframe
    ref={ref}
    width={Math.min(width, 600)}
    height={450}
    style={{
      border: 0,
    }}
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src={`https://www.google.com/maps/embed/v1/place?key=${GoogleMapsAPIKey}`
      + `&q=${props.q ?? `${props.lat.toFixed(4)},${props.lng.toFixed(4)}`}`
      + `&zoom=${props.zoom}`
      + `&center=${props.lat.toFixed(4)},${props.lng.toFixed(4)}`
      + `&region=JP`}
  ></iframe>;
}
