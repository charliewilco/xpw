import { useState, useEffect, useCallback } from "react";
import { isHexColor } from "./utils";

const __IS_BROWSER__: boolean = typeof window !== "undefined";

export const usePersistedHistory = (color: string, key = "XPW_COLORS") => {
  const [history, setHistory] = useState<string[]>([]);

  const updateStorage = useCallback(
    (color: string) => {
      if (isHexColor(color)) {
        setHistory((prev) => {
          let newColors = Array.from(new Set([...prev, color]));
          localStorage.setItem(key, JSON.stringify(newColors));

          return newColors;
        });
      }
    },
    [key, setHistory]
  );

  useEffect(() => {
    if (__IS_BROWSER__) {
      const value = localStorage.getItem(key);
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        setHistory(Array.from(new Set(...parsed)));
      }
    }
  }, [setHistory, key]);

  useEffect(() => {
    if (__IS_BROWSER__) {
      updateStorage(color);
    }
  }, [color, key, updateStorage]);

  const handleClear = useCallback(() => {
    localStorage.clear();

    setHistory([]);
  }, [setHistory]);

  return [history, handleClear] as const;
};
