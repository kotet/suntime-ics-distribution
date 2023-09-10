export const BasePath = import.meta.env.BASE_URL;
export const IsDevelopment = import.meta.env.DEV;
export const IsSSG = import.meta.env.SSR;

export function getBaseURL() {
  return new URL(BasePath, IsDevelopment ? 'http://localhost:3000/' : 'https://kotet.jp/suntime-ics-distribution/')
}
