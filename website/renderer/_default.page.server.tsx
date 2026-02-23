// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname"];

import ReactDOMServer from "react-dom/server";
import type { PageContextServer } from "./types";
import * as fs from "fs";
import escapeHTML from "escape-html";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";
import { ReactRoot } from "./render";
import { ColorSchemeScript } from "@mantine/core";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";

const cache = createCache({ key: "mantine" });
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(cache);

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");
  if (!pageProps)
    throw new Error(
      "My render() hook expects pageContext.pageProps to be defined",
    );

  let { documentProps } = pageContext.exports;
  const { getDocumentProps } = pageContext.exports;
  if (getDocumentProps && pageProps) {
    documentProps = getDocumentProps(pageProps);
  }
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";

  const pageHtml = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ReactRoot Page={Page} props={pageProps} />
    </CacheProvider>,
  );

  const emotionChunks = extractCriticalToChunks(pageHtml);
  const emotionStyles = constructStyleTagsFromChunks(emotionChunks);

  // Extract Mantine inline styles from pageHtml to move them to the head
  const mantineStyles =
    pageHtml
      .match(/<style data-mantine-styles="[^"]*">[\s\S]*?<\/style>/g)
      ?.join("") || "";

  const template = fs.readFileSync("template.html", "utf-8");
  const replacedHtml = template
    .replace("%TITLE%", escapeHTML(`${title} - KotetJP`))
    .replace("%DESCRIPTION%", escapeHTML(desc))
    .replace("%HTML_ATTRIBUTES%", 'data-mantine-color-scheme="dark"')
    .replace(
      "%CUSTOMHEAD%",
      ReactDOMServer.renderToString(
        <ColorSchemeScript defaultColorScheme="dark" />,
      ) +
        emotionStyles +
        mantineStyles,
    )
    .replace("%REACTROOT%", pageHtml);
  const wrappedHtml = escapeInject`${dangerouslySkipEscape(replacedHtml)}`;

  return {
    documentHtml: wrappedHtml,
    pageContext: {},
  };
}
