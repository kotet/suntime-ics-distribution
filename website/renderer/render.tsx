import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import LanguageDetector from "i18next-browser-languagedetector";
import { MantineProvider } from "@mantine/core";
import { Global } from '@emotion/react';
import type { PageProps } from "./types";
import { PageShell } from "../components/page_shell";
import { LocalStoragePrefix } from "../pages/constants";

import '../utils/i18n';
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import { useLocalStorage } from "@mantine/hooks";

export const ReactRoot: React.FC<{ Page: React.ComponentType<unknown & PageProps>, props: PageProps }> = ({ Page, props }) => {
  // dark mode。初期値がライトモードだとまぶしいのでhydrate前はdarkにしておく
  const [localStorageDarkMode, setLocalStorageDarkMode] = useLocalStorage<boolean | null>({
    key: `${LocalStoragePrefix}darkMode`,
    defaultValue: null,
  });
  const [realDarkMode, setRealDarkMode] = useState(true);
  // 初来訪時
  useEffect(() => {
    if (localStorageDarkMode === null) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setRealDarkMode(prefersDark);
    }
  }, []);
  // 設定ボタンを押したとき&hydrate後の初回レンダリング
  useEffect(() => {
    if (localStorageDarkMode !== null) {
      setRealDarkMode(localStorageDarkMode);
    }
  },[localStorageDarkMode]);

  // language
  useEffect(() => {
    const detector = new LanguageDetector();
    const lang = detector.detect();
    if (typeof lang === 'string') {
      i18n.changeLanguage(lang);
    } else if (Array.isArray(lang) && lang.length > 0) {
      i18n.changeLanguage(lang[0]);
    }
  }, []);

  return <>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <MantineProvider defaultColorScheme="dark" forceColorScheme={realDarkMode ? 'dark' : 'light'}>
          <Global styles={{
            '.adsbygoogle': {
              maxWidth: 600,
              minWidth: 120,
              minHeight: 50
            }
          }} />
          <Notifications />
          <PageShell darkMode={realDarkMode} setDarkMode={setLocalStorageDarkMode} pageProps={props}>
            {
              <Page {...props} />
            }
          </PageShell>
        </MantineProvider>
      </I18nextProvider>
    </React.StrictMode>
  </>;
}
