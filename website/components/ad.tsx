import React, { useEffect } from 'react';
import { IsDevelopment } from '../pages/constants';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const Ad: React.FC = () => {

  useEffect(() => {
    if (IsDevelopment) return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return <>
    {
      IsDevelopment ? <div
      className='adsbygoogle'
      style={{
        display: 'block',
        backgroundColor: 'lightgray',
      }} >ad</div> :
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8443812672116269"
          data-ad-slot="9074565386"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
  }
  </>;
};
