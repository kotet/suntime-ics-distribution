export const BasePath = import.meta.env.BASE_URL;
export const IsDevelopment = import.meta.env.DEV;
export const IsSSG = import.meta.env.SSR;
export const LocalStoragePrefix = 'suntime-ics-distribution';
export const SiteTitle = '世界と日本の日の出と日の入りカレンダー';

export function getBaseURL() {
  return new URL(BasePath, IsDevelopment ? 'http://localhost:3000/' : 'https://kotet.jp/suntime-ics-distribution/')
}

// No need to hide because it is available at no cost and is intended to be embedded in the URL of the iframe
// ref:
// - https://developers.google.com/maps/documentation/embed/get-started
// - https://developers.google.com/maps/documentation/embed/usage-and-billing
export const GoogleMapsAPIKey = "AIzaSyBCoI0Wtax7X3DvyJzEhHLK4dRuOXMj-EE";
