import { useMemo, useState } from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import darkModeIcon from "./assets/darkMode.svg";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const children = useMemo(() => {
    return (
      <>
        <MainContent />
        <Footer />
      </>
    );
  }, []);

  return (
    <div
      className={`
        min-h-screen flex flex-col overflow-y-scroll
        text-slate-950 bg-slate-300
        dark:text-slate-300 dark:bg-slate-950
        p-0 pt-20 sm:p-2 sm:pt-20 sm:pb-0 justify-between
        ${darkMode ? "dark" : ""}
      `}
    >
      <input
        className="
          fixed top-3 right-3 w-8
          invert-[20%] hover:invert-0
          dark:invert-[50%] dark:hover:invert-[90%]
        "
        type="image"
        src={darkModeIcon}
        alt="Dark mode toggle"
        onClick={() => setDarkMode(!darkMode)}
      />
      {children}
    </div>
  )
}
