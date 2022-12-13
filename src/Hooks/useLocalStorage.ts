import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  const [State, setState] = useState<T>(() => {
    const JSONValue = window.localStorage.getItem(key);

    if (!JSONValue) {
      return defaultValue;
    } else {
      return JSON.parse(JSONValue);
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(State));
  }, [key, State]);

  return { State, setState };
}

export default useLocalStorage;
