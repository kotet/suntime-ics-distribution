import { useLocalStorage } from "@mantine/hooks";
import { IsSSG } from "../pages/constants";
import React from "react";

export function useLocalStorageSSG<T>({
  key, defaultValue, defaultValueSSG,
}: {
  key: string;
  defaultValue: T;
  defaultValueSSG: T;
}): [T, (value: T) => void] {
  const [LSValue, setLocalStorage] = useLocalStorage({
    key,
    defaultValue,
  });
  const [state, setState] = React.useState(defaultValueSSG);
  React.useEffect(() => {
    setState(LSValue);
  }, [LSValue]);
  const setValueWrapped = (value: T) => {
    if (!IsSSG) {
      setLocalStorage(value);
    }
    setState(value);
  }
  return [state, setValueWrapped];
}
