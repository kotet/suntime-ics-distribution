import {
  Container,
  Group,
  Title,
  ActionIcon,
  Breadcrumbs,
  Divider,
  Text,
  Stack,
} from "@mantine/core";
import React from "react";
import {
  IconBrandGithub,
  IconHome,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { BreadcrumbsEntry, PageProps } from "../renderer/types";
import { Ad } from "./ad";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

type PageShellProps = {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  language: string;
  setLanguage: (language: string | null) => void;
  pageProps: PageProps;
};
export const PageShell: React.FC<PageShellProps> = (props: PageShellProps) => {
  const crumbs = props.pageProps.breadcrumbs;
  const { t } = useTranslation();
  return (
    <>
      <Container fluid px="md" p="lg">
        <Group justify="space-between">
          <Stack>
            <Title>{t("site_title_full")}</Title>
            <Text>{t("site_description")}</Text>
          </Stack>
          <Group>
            <ActionIcon.Group>
              <ActionIcon
                title={t("switch_language_ja_tooltip")}
                variant={props.language === "ja" ? "filled" : "default"}
                onClick={() => {
                  props.setLanguage("ja");
                }}
              >
                🇯🇵
              </ActionIcon>
              <ActionIcon
                title={t("switch_language_en_tooltip")}
                variant={props.language === "en" ? "filled" : "default"}
                onClick={() => {
                  props.setLanguage("en");
                }}
              >
                🇺🇸
              </ActionIcon>
            </ActionIcon.Group>
            <Divider orientation="vertical" />
            <ActionIcon
              title={t("switch_theme_tooltip")}
              variant="default"
              onClick={() => {
                props.setDarkMode(!props.darkMode);
              }}
            >
              {" "}
              {props.darkMode ? <IconSun /> : <IconMoon />}{" "}
            </ActionIcon>
            <Divider orientation="vertical" />
            <ActionIcon title={t("view_source_tooltip")} variant="default">
              <a
                href="https://github.com/kotet/suntime-ics-distribution"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                <IconBrandGithub />
              </a>
            </ActionIcon>
            <ActionIcon title={t("home_tooltip")} variant="default">
              <a
                href="https://kotet.jp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                <IconHome />
              </a>
            </ActionIcon>
          </Group>
        </Group>
        <BreadcrumbsFromProps entries={crumbs} />
      </Container>
      <Divider />
      <Container fluid px="md">
        {props.children}
      </Container>
      <Container fluid py="lg">
        <Ad />
      </Container>
    </>
  );
};

type BreadcrumbsProps = {
  entries?: BreadcrumbsEntry[];
};
const BreadcrumbsFromProps: React.FC<BreadcrumbsProps> = ({
  entries,
}: BreadcrumbsProps) => {
  const { t } = useTranslation();
  if (!entries) {
    return <></>;
  }
  return (
    <Breadcrumbs
      style={{
        fontSize: "0.8rem",
      }}
      separator={">"}
      p="xs"
    >
      {entries.map((e, i) => {
        if (e.href) {
          return (
            <a href={e.href} key={i}>
              {t(e.i18n_key, e.values ?? {})}
            </a>
          );
        }
        return (
          <Text key={i} c="dimmed">
            {t(e.i18n_key, e.values ?? {})}
          </Text>
        );
      })}
    </Breadcrumbs>
  );
};
