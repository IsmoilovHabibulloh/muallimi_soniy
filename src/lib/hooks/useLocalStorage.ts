"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Eski versiyadan saqlangan obyektda yangi maydonlar bo'lmasligi
        // mumkin — defaultlar bilan birlashtiramiz (masalan, theme yo'q
        // bo'lsa "light" qoladi).
        if (
          parsed !== null &&
          typeof parsed === "object" &&
          !Array.isArray(parsed) &&
          initialValue !== null &&
          typeof initialValue === "object" &&
          !Array.isArray(initialValue)
        ) {
          setStoredValue({ ...initialValue, ...parsed });
        } else {
          setStoredValue(parsed);
        }
      }
    } catch {
      // keep initial value
    }
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
          // storage full or unavailable
        }
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue, isLoaded] as const;
}
