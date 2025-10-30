import { useEffect, useState } from "react";

interface DarkModeHook {
    darkMode: boolean;
    setDarkMode : (value: boolean) => void;
}
export const useDarkMode = ():DarkModeHook => {
  const [darkMode, setDarkMode] = useState(()=>{
  // Check if user has already set a preference
  const savedMode = localStorage.getItem("darkMode"); 
  //otherwise, check system preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedMode ? savedMode === "true" : prefersDark;
});

useEffect(()=>{
    localStorage.setItem("darkMode" , darkMode.toString());
    if (darkMode) {
        document.documentElement.classList.add("dark");
    } else{
        document.documentElement.classList.remove("dark")
    }
},[darkMode]);

    return {darkMode, setDarkMode};
}

