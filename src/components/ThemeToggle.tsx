"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "dark" ? "claro" : "oscuro";
  const icon = theme === "dark" ? "light_mode" : "dark_mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`cambiar a modo ${nextThemeLabel}`}
      className="flex items-center gap-2 border border-primary px-3 py-1 text-xs text-primary hover:bg-primary hover:text-black transition-colors uppercase font-bold"
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span>[MODO]</span>
    </button>
  );
}
