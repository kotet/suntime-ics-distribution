import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import LanguageDetector from "i18next-browser-languagedetector";
import { MantineProvider } from "@mantine/core";
import { Global } from "@emotion/react";
import type { PageProps } from "./types";
import { PageShell } from "../components/page_shell";
import { LocalStoragePrefix } from "../pages/constants";

import "../utils/i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

const darkModeKey = `${LocalStoragePrefix}darkMode`;
const languageKey = `${LocalStoragePrefix}-language`;

export const ReactRoot: React.FC<{
  Page: React.ComponentType<unknown & PageProps>;
  props: PageProps;
}> = ({ Page, props }) => {
  // dark mode。初期値がライトモードだとまぶしいのでhydrate前はdarkにしておく
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  useEffect(() => {
    if (darkMode !== null) {
      return;
    }
    // localStorageからダークモードの設定を読み込む。初期化前とデフォルト初期化後を区別できないのでmantineのuseLocalStorageは使わない
    const storedDarkMode = localStorage.getItem(darkModeKey);
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === "true");
    } else {
      // 初来訪時
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, [darkMode]);
  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem(darkModeKey, darkMode.toString());
    }
  }, [darkMode]);

  const realDarkMode = darkMode ?? true;

  const [language, setLanguage] = useState<string | null>(null);
  useEffect(() => {
    if (language !== null) {
      return;
    }
    const storedLanguage = localStorage.getItem(languageKey);
    if (storedLanguage !== null) {
      setLanguage(storedLanguage);
      return;
    }
    const detector = new LanguageDetector();
    const lang = detector.detect();
    if (typeof lang === "string") {
      setLanguage(lang);
    } else if (Array.isArray(lang) && lang.length > 0) {
      setLanguage(lang[0]);
    }
  }, [language, setLanguage]);
  useEffect(() => {
    if (language !== null) {
      i18n.changeLanguage(language);
      localStorage.setItem(languageKey, language);
    }
  }, [language]);

  return (
    <>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <MantineProvider
            defaultColorScheme="dark"
            forceColorScheme={realDarkMode ? "dark" : "light"}
          >
            <Global
              styles={{
                ".adsbygoogle": {
                  maxWidth: 600,
                  minWidth: 120,
                  minHeight: 50,
                },
              }}
            />
            <Notifications />
            <PageShell
              darkMode={realDarkMode}
              setDarkMode={setDarkMode}
              language={language ?? i18n.language}
              setLanguage={setLanguage}
              pageProps={props}
            >
              {<Page {...props} />}
            </PageShell>
          </MantineProvider>
        </I18nextProvider>
      </React.StrictMode>
    </>
  );
};
