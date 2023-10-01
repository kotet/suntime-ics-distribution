import React from "react";
import { Notifications } from "@mantine/notifications";
import type { PageProps } from "./types";
import { MantineProvider } from "@mantine/core";
import { PageShell } from "../components/page_shell";
import { LocalStoragePrefix } from "../pages/constants";
import { useLocalStorageSSG } from "./useLocalStorageSSG";

export const ReactRoot: React.FC<{ Page: React.ComponentType<unknown & PageProps>, props: PageProps }> = ({ Page, props }) => {
  const [darkMode, setDarkMode] = useLocalStorageSSG({
    key: `${LocalStoragePrefix}darkMode`,
    defaultValue: false,
    defaultValueSSG: true,
  });
  return <>
    <React.StrictMode>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={{
        colorScheme: darkMode ? 'dark' : 'light',
        globalStyles: () => ({
          '.adsbygoogle': {
            maxWidth: 1200,
            minWidth: 120,
            minHeight: 50
          }
        }),
      }}>
        <Notifications />
        <PageShell darkMode={darkMode} setDarkMode={setDarkMode} pageProps={props}>
          {
            <Page {...props} />
          }
        </PageShell>
      </MantineProvider>
    </React.StrictMode>
  </>;
}
