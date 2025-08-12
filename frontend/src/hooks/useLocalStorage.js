import { useState, useEffect } from "react";

/**
 * useLocalStorage(key, initialValue)
 * - stores value in localStorage under key
 * - returns [value, setValue]
 */
function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (state === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
