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

export const ReactRoot: React.FC<{ Page: React.ComponentType<unknown & PageProps>, props: PageProps }> = ({ Page, props }) => {
  // dark mode。初期値がライトモードだとまぶしいのでhydrate前はdarkにしておく
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  useEffect(() => {
    if (darkMode !== null) {
      return;
    }
    // localStorageからダークモードの設定を読み込む
    const storedDarkMode = localStorage.getItem(`${LocalStoragePrefix}darkMode`);
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    } else {
      // 初来訪時
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);
  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem(`${LocalStoragePrefix}darkMode`, darkMode.toString());
    }
  }, [darkMode]);

  const realDarkMode = darkMode ?? true;

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
          <PageShell darkMode={realDarkMode} setDarkMode={setDarkMode} pageProps={props}>
            {
              <Page {...props} />
            }
          </PageShell>
        </MantineProvider>
      </I18nextProvider>
    </React.StrictMode>
  </>;
}
