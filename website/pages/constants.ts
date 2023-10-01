export const BasePath = import.meta.env.BASE_URL;
export const IsDevelopment = import.meta.env.DEV;
export const IsSSG = import.meta.env.SSR;
export const LocalStoragePrefix = 'suntime-ics-distribution';
export const SiteTitle = '世界と日本の日の出と日の入りカレンダー';

export function getBaseURL() {
  return IsDevelopment ? 'http://localhost:3000' : 'https://kotet.jp';
}

export const GoogleMapsAPIKey = import.meta.env.VITE_MAPS_KEY;
console.log('GoogleMapsAPIKey', GoogleMapsAPIKey);
