// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

import ReactDOMServer from 'react-dom/server'
import type { PageContextServer } from './types'
import * as fs from 'fs';
import escapeHTML from 'escape-html';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';
import { ReactRoot } from './render';
import { ServerStyles, createStylesServer } from '@mantine/ssr';

const stylesServer = createStylesServer();

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');
  if (!pageProps) throw new Error('My render() hook expects pageContext.pageProps to be defined');

  let { documentProps } = pageContext.exports;
  const { getDocumentProps } = pageContext.exports;
  if (getDocumentProps && pageProps) {
    documentProps = getDocumentProps(pageProps);
  }
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  const pageHtml = ReactDOMServer.renderToString(<ReactRoot Page={Page} props={pageProps} />)
  const template = fs.readFileSync('template.html', 'utf-8');
  const replacedHtml = template.replace('%TITLE%', escapeHTML(`${title} - KotetJP`))
    .replace('%DESCRIPTION%', escapeHTML(desc))
    .replace('%CUSTOMHEAD%', ReactDOMServer.renderToString(<ServerStyles html={pageHtml} server={stylesServer} />))
    .replace('%REACTROOT%', pageHtml);
  const wrappedHtml = escapeInject`${dangerouslySkipEscape(replacedHtml)}`;

  return {
    documentHtml: wrappedHtml,
    pageContext: {}
  }
}
