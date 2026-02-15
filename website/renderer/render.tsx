import React from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import type { PageProps } from "./types";
import { MantineProvider } from "@mantine/core";
import { Global } from '@emotion/react';
import { PageShell } from "../components/page_shell";
import { LocalStoragePrefix } from "../pages/constants";
import { useLocalStorageSSG } from "./useLocalStorageSSG";

import '../utils/i18n';
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

export const ReactRoot: React.FC<{ Page: React.ComponentType<unknown & PageProps>, props: PageProps }> = ({ Page, props }) => {
  const [darkMode, setDarkMode] = useLocalStorageSSG({
    key: `${LocalStoragePrefix}darkMode`,
    defaultValue: false,
    defaultValueSSG: true,
  });
  return <>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <MantineProvider forceColorScheme={darkMode ? 'dark' : 'light'}>
          <Global styles={{
            '.adsbygoogle': {
              maxWidth: 600,
              minWidth: 120,
              minHeight: 50
            }
          }} />
          <Notifications />
          <PageShell darkMode={darkMode} setDarkMode={setDarkMode} pageProps={props}>
            {
              <Page {...props} />
            }
          </PageShell>
        </MantineProvider>
      </I18nextProvider>
    </React.StrictMode>
  </>;
}
