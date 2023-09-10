// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

import ReactDOMServer from 'react-dom/server'
import type { PageContextServer } from './types'
import * as fs from 'fs';
import escapeHTML from 'escape-html';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')

  const pageHtml = ReactDOMServer.renderToString(
    <Page {...pageProps} />
  )

  let { documentProps } = pageContext.exports;
  const { getDocumentProps } = pageContext.exports;
  if (getDocumentProps && pageProps) {
    documentProps = getDocumentProps(pageProps);
  }
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  const template = fs.readFileSync('template.html', 'utf-8');
  const replacedHtml = template.replace('%TITLE%', escapeHTML(`${title} - KotetJP`))
    .replace('%DESCRIPTION%', escapeHTML(desc))
    .replace('%REACTROOT%', pageHtml);
  const wrappedHtml = escapeInject`${dangerouslySkipEscape(replacedHtml)}`;

  return {
    documentHtml: wrappedHtml,
    pageContext: {}
  }
}
