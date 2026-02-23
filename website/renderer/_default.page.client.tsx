import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { hydrateRoot } from "react-dom/client";
import type { PageContextClient } from "./types";
import { ReactRoot } from "./render";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const cache = createCache({ key: "mantine" });

export { render };

// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined",
    );
  if (!pageProps)
    throw new Error(
      "Client-side render() hook expects pageContext.pageProps to be defined",
    );
  const root = document.getElementById("react-root");
  if (!root) throw new Error("DOM element #react-root not found");
  hydrateRoot(
    root,
    <CacheProvider value={cache}>
      <ReactRoot Page={Page} props={pageProps} />
    </CacheProvider>,
  );
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
