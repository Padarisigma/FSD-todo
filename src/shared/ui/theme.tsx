import { useEffect, useState } from "react";
import Button from "./button"; // Importing your button

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      color="theme" 
      size="small" 
      onClick={toggleTheme}
      sx="px-4 py-2"
    >
      {theme === "light" ? " Dark Mode 🌙" : "Light Mode 🌞"}
    </Button>
  );
}