import { Container, Group, Title, ActionIcon, Breadcrumbs, Divider, Text, Stack } from "@mantine/core";
import React from "react";
import { IconBrandGithub, IconHome, IconMoon, IconSun } from "@tabler/icons-react";
import { SiteTitle } from "../pages/constants";
import { BreadcrumbsEntry, PageProps } from "../renderer/types";
import { Ad } from "./ad";

type PageShellProps = {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  pageProps: PageProps;
};
export const PageShell: React.FC<PageShellProps> = (props: PageShellProps) => {
  const crumbs = props.pageProps.breadcrumbs;
  return <>
    <Container fluid px='md' p='lg'>
      <Group position='apart'>
        <Stack>
          <Title>{SiteTitle}</Title>
          <Text>日の出と日の入りの時刻のicsファイルです。Googleカレンダーなどにインポートして使えます</Text>
        </Stack>
        <Group>
          <ActionIcon title='Switch theme' variant='default' onClick={() => { props.setDarkMode(!props.darkMode) }}> {props.darkMode ? <IconSun /> : <IconMoon />}  </ActionIcon>
          <ActionIcon title='View source' variant='default'><a href='https://github.com/kotet/suntime-ics-distribution' target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><IconBrandGithub /></a></ActionIcon>
          <ActionIcon title='kotet.jp' variant='default'><a href='https://kotet.jp' target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><IconHome /></a></ActionIcon>
        </Group>
      </Group>
      <BreadcrumbsFromProps entries={crumbs} />
    </Container>
    <Divider />
    <Container fluid px='md'>
      {props.children}
    </Container>
    <Container fluid py='lg'>
      <Ad />
    </Container>
  </>;
};

type BreadcrumbsProps = {
  entries?: BreadcrumbsEntry[];
};
const BreadcrumbsFromProps: React.FC<BreadcrumbsProps> = ({ entries }: BreadcrumbsProps) => {
  if (!entries) {
    return <></>;
  }
  return <Breadcrumbs sx={{
    fontSize: '0.8rem',
  }} separator={'>'} p='xs'>{entries.map(((e, i) => {
    if (e.href) {
      return <a href={e.href} key={i}>{e.name}</a>
    }
    return <Text key={i} c='dimmed'>{e.name}</Text>;
  }))}</Breadcrumbs>;
};
