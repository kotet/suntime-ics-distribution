import React, { useEffect, useState } from 'react';
import { IsSSG } from '../pages/constants';
import { Autocomplete, Group, Skeleton } from '@mantine/core';

export type PageListEntry = {
  short_name: string;
  long_name: string;
  href: string;
};
export type PageListProps = {
  entries: PageListEntry[];
}
enum Mode {
  List,
  Grid,
}
type AutocompleteData = {
  value: string;
  label: string;
  href: string;
};
export const PageList: React.FC<PageListProps> = (props: PageListProps) => {
  const [mode, setMode] = React.useState<Mode>(Mode.List);
  const [value, setValue] = React.useState('');

  useEffect(() => {
    if (IsSSG) {
      return;
    }
    const onResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        setMode(Mode.List);
      } else {
        setMode(Mode.Grid);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const autoCompleteData: AutocompleteData[] = props.entries.map((entry) => {
    return {
      value: `${entry.short_name} ${entry.long_name}`,
      label: entry.long_name,
      href: entry.href,
    }
  });

  return <div>
    <Group style={{ maxWidth: 600 }}>
      <SwitchButtom mode={mode} setMode={setMode} />
      <Autocomplete
        value={value}
        onChange={setValue}
        onItemSubmit={(value: AutocompleteData) => {
          window.location.href = value.href;
        }}
        data={value.length > 0 ? autoCompleteData : []}
        placeholder='Search'
        style={{
          flexGrow: 1,
        }}></Autocomplete>
    </Group>
    {
      (() => {
        switch (mode) {
          case Mode.List:
            return <List {...props} />;
          case Mode.Grid:
            return <Grid {...props} />;
        }
      })()
    }
  </div>
};

type SwitchButtomProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};
const SwitchButtom: React.FC<SwitchButtomProps> = (props: SwitchButtomProps) => {
  // https://github.com/vercel/next.js/discussions/21999
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const { mode, setMode } = props;
  return <div>
    {ready ? <>
      <button disabled={mode === Mode.List} onClick={() => setMode(Mode.List)}>List</button>
      <button disabled={mode === Mode.Grid} onClick={() => setMode(Mode.Grid)}>Grid</button>
    </> : <Skeleton height='2em' width='5em' />}
  </div>;
};

const List: React.FC<PageListProps> = (props: PageListProps) => {
  return <ul>
    {
      props.entries.map((entry, i) => {
        return <li key={i}>
          <a href={entry.href}>{entry.long_name}</a>
        </li>;
      })
    }
  </ul>
};

const Grid: React.FC<PageListProps> = (props: PageListProps) => {
  return <ul style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    width: '100%',
    padding: 0,
  }}>
    {
      props.entries.map((entry, i) => {
        return <li key={i} style={{
          listStyle: 'none',
        }}>
          <a href={entry.href} style={{
            margin: 0,
          }}>
            <div title={entry.long_name} style={{
              width: '100px',
              padding: '10px',
              border: '1px solid black',
              marginRight: '-1px',
              marginBottom: '-1px',
              textAlign: 'center',
            }}>
              {entry.short_name}
            </div>
          </a>
        </li>;
      })
    }
  </ul>;
};
