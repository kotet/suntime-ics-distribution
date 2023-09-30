import React, { useEffect, useMemo } from "react";
import ICAL from 'ical';

import { Skeleton, useMantineTheme, Stack, Flex, Text } from "@mantine/core";

import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, TimeScale, Tooltip, ChartOptions, Chart, Plugin } from 'chart.js';

import { IsSSG } from "../pages/constants";

ChartJS.register(LinearScale, PointElement, CategoryScale, LineElement, Tooltip, TimeScale);
ChartJS.defaults.font.size = 14;

export type CalendarViewerProps = {
  sunriseURL: URL;
  sunsetURL: URL;
  initialStart: Date;
  initialEnd: Date;
  width?: number,
  height?: number,
}
enum InitialZoomState {
  Initial,
  LoadingZoomPlugin,
  ZoomCompleted,
}
export const CalendarViewer: React.FC<CalendarViewerProps> = (props: CalendarViewerProps) => {
  const sunriseCalendar = useICS(props.sunriseURL);
  const sunsetCalendar = useICS(props.sunsetURL);
  const sunriseData = React.useMemo(() => parseICSData(sunriseCalendar), [sunriseCalendar]);
  const sunsetData = React.useMemo(() => parseICSData(sunsetCalendar), [sunsetCalendar]);
  const [start, setStart] = React.useState<Date>(props.initialStart);
  const [end, setEnd] = React.useState<Date>(props.initialEnd);
  const theme = useMantineTheme();
  const chartRef = React.useRef(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [Zoom, setZoomPlugin] = React.useState<Plugin | null>(null);
  const [zoomState, setZoomState] = React.useState<InitialZoomState>(InitialZoomState.Initial);
  const [width, setWidth] = React.useState<number>(props.width ?? 600);
  const height = props.height ?? 450;

  const isDarkMode = theme.colorScheme === 'dark';

  useEffect(() => {
    const h = () => {
      const mw = 600;
      if (rootRef.current === null) {
        setWidth(Math.min(window.innerWidth, mw));
      } else {
        setWidth(Math.min(rootRef.current.parentElement?.clientWidth ?? window.innerWidth, mw));
      }
    }
    h();
    window.addEventListener('resize', h);
    return () => {
      window.removeEventListener('resize', h);
    };
  }, []);

  // const height = props.height ?? 450;

  React.useEffect(() => {
    import('chartjs-plugin-zoom').then((module) => {
      setZoomPlugin(module.default);
    });
  }, []);

  React.useEffect(() => {
    if (chartRef.current !== null) {
      const chart = chartRef.current as unknown as ChartJS<'scatter'>;
      if (chart.isPluginEnabled('zoom') && zoomState === InitialZoomState.Initial) {
        setZoomState(InitialZoomState.LoadingZoomPlugin);
      }
      if (zoomState === InitialZoomState.LoadingZoomPlugin) {
        chart.zoomScale('x', {
          min: props.initialStart.getTime(),
          max: props.initialEnd.getTime(),
        }, "default");
        setZoomState(InitialZoomState.ZoomCompleted);
      }
    }
  }, [zoomState, Zoom, sunriseData, props.initialStart, props.initialEnd]);

  const scatterGraphData = useMemo(() => {
    if (sunriseData === null || sunsetData === null) {
      return {
        datasets: []
      };
    }
    return {
      datasets: [
        {
          label: '🌅Sunrise',
          data: sunriseData.data.filter((v) => v.x >= start && v.x <= end),
          backgroundColor: isDarkMode ? 'orange' : 'darkorange',
        },
        {
          label: '🌇Sunset',
          data: sunsetData.data.filter((v) => v.x >= start && v.x <= end),
          backgroundColor: isDarkMode ? 'lightblue' : 'blue',
        },
      ]
    }
  }, [sunriseData, sunsetData, isDarkMode, start, end]);

  const scatterGraphOptions: ChartOptions<'scatter'> = useMemo(() => {
    return {
      responsive: false,
      devicePixelRatio: IsSSG ? 1 : window.devicePixelRatio * 2,
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          ticks: {
            color: isDarkMode ? theme.colors.gray[4] : theme.colors.dark[9],
            callback: (value) => {
              const d = new Date(value);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }
          },
          grid: {
            color: isDarkMode ? theme.colors.dark[4] : undefined,
          }
        },
        y: {
          type: 'linear',
          min: 0,
          max: 86400,
          reverse: true,
          ticks: {
            color: isDarkMode ? theme.colors.gray[4] : theme.colors.dark[9],
            callback: (value) => {
              if (typeof value === 'number') {
                return `${Math.floor(value / (60 * 60)).toString().padStart(2, '0')}`
                  + `:${Math.floor((value % (60 * 60)) / 60).toString().padStart(2, '0')}`;
              }
              return value;
            },
            // every 1 hour
            stepSize: 3600,
          },
          grid: {
            color: isDarkMode ? theme.colors.dark[4] : undefined,
          }
        }
      },
      interaction: {
        mode: 'point',
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const x = (context.raw as DataSet).x as Date;
              const y = (context.raw as DataSet).y as number;
              return `${context.dataset.label}: ${x.toLocaleDateString()}: ${Math.floor(y / (60 * 60))}:${Math.floor((y % (60 * 60)) / 60)}`;
            }
          }
        },
        zoom: {
          pan: {
            onPanComplete: (context: { chart: Chart }) => {
              setStart(new Date(context.chart.scales.x.min));
              setEnd(new Date(context.chart.scales.x.max));
            },
            enabled: true,
            mode: 'x',
          },
          zoom: {
            onZoomComplete: (context: { chart: Chart }) => {
              setStart(new Date(context.chart.scales.x.min));
              setEnd(new Date(context.chart.scales.x.max));
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        }
      }
    }
  }, [isDarkMode, theme]);

  return <>
    <Stack
      ref={rootRef}
      sx={{
        gap: 0,
        paddingTop: 10,
        paddingBottom: 10,
        border: '1px solid gray',
      }}>
      {
        sunriseData === null || sunsetData === null ?
          <Skeleton width={width} height={30} /> :
          <Flex
            wrap={'wrap'}
            sx={{
              gap: '1em',
              marginLeft: 5,
            }}>
            <input type="date" value={start.toISOString().slice(0, 10)} onChange={(e) => {
              setStart(new Date(e.target.value));
            }} style={{ width: 600 * 0.45 }} />
            -
            <input type="date" value={end.toISOString().slice(0, 10)} onChange={(e) => {
              setEnd(new Date(e.target.value));
            }} style={{ width: 600 * 0.45 }} />
          </Flex>
      }
      <Skeleton width={width} height={30} visible={sunriseData === null || sunsetData === null}>
        <Text sx={{ marginLeft: 5 }} span>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</Text>
      </Skeleton>
      <Skeleton visible={sunriseData === null || sunsetData === null} width={width} height={height - 80}>
        {
          Zoom === null ? <></> :
            <Scatter ref={chartRef} width={width} height={height - 80} data={scatterGraphData}
              options={scatterGraphOptions}
              plugins={[Zoom]}
            />
        }
      </Skeleton>
    </Stack >
  </>
};

type DataSet = { x: Date, y: number };
type ParsedICSData = {
  data: DataSet[];
  labels: string[];
};
const parseICSData = (c: ICAL.FullCalendar | null): ParsedICSData | null => {
  if (c === null) {
    return null;
  }
  const data: {
    start: Date
    y: number
    label: string
  }[] = [];
  for (const [, value] of Object.entries(c)) {
    if (value.start !== undefined) {
      data.push({
        start: value.start,
        label: value.start.toDateString(),
        y: date2time(value.start)
      });
    }
  }
  data.sort((a, b) => a.start < b.start ? -1 : 1);
  return {
    data: data.map((v) => ({ x: v.start, y: v.y })),
    labels: data.map((v) => v.label),
  }
};

// convert date to 0 - 86400 seconds
const date2time = (date: Date): number => {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

const useICS = (icsPath: URL) => {
  const dataRef = React.useRef<ICAL.FullCalendar | null>(null);
  const subscribe = React.useCallback((onStoreChange: (store: ICAL.FullCalendar) => void): (() => void) => {
    const controller = new AbortController();
    fetch(icsPath.toString(), { method: 'GET' }).then((response) => response.text()).then((data) => {
      const c = ICAL.parseICS(data);
      dataRef.current = c;
      onStoreChange(c);
    }).catch((error) => {
      console.error(error);
    });
    return () => {
      controller.abort();
    }
  }, [icsPath]);
  return React.useSyncExternalStore(subscribe, () => dataRef.current, () => null);
}
