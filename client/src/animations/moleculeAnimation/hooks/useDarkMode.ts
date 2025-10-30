import { useState, useCallback, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const checkDarkMode = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    checkDarkMode();

    const darkModeObserver = new MutationObserver(checkDarkMode);
    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => darkModeObserver.disconnect();
  }, [checkDarkMode]);

  return { isDarkMode, checkDarkMode };
}
