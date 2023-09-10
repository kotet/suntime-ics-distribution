import React, { useEffect } from 'react';
import { IsSSG } from '../pages/constants';

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
export const PageList: React.FC<PageListProps> = (props: PageListProps) => {
  const [mode, setMode] = React.useState<Mode>(Mode.List);

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

  return <div>
    <SwitchButtom mode={mode} setMode={setMode} />
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
  const { mode, setMode } = props;
  return <div>
    <button disabled={mode === Mode.List} onClick={() => setMode(Mode.List)}>List</button>
    <button disabled={mode === Mode.Grid} onClick={() => setMode(Mode.Grid)}>Grid</button>
  </div>
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
