// define el componente `ThemeToggle` que alterna entre temas claro y oscuro.
"use client";

import { useTheme } from "@/hooks";

export function ThemeToggle() {
  // extrae el tema actual y la función para alternarlo.
  const { theme, toggleTheme } = useTheme();
  // calcula la etiqueta del próximo tema.
  const nextThemeLabel = theme === "dark" ? "claro" : "oscuro";
  // determina el icono del próximo tema.
  const icon = theme === "dark" ? "light_mode" : "dark_mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`cambiar a modo ${nextThemeLabel}`}
      className="flex items-center gap-2 border border-primary px-3 py-1 text-xs text-primary hover:bg-primary hover:text-background-dark transition-colors uppercase font-bold"
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span>[MODO]</span>
    </button>
  );
}
