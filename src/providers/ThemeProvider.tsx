"use client";

import { createContext, useEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/constants";

// define el tipo de tema usado en la app
type Theme = "dark" | "light";

// define la forma del contexto de tema
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const DEFAULT_THEME: Theme = "dark";
const listeners = new Set<() => void>();

// lee el tema desde localStorage; devuelve el valor por defecto en ssr
function readTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" ? "light" : "dark";
}

// implementa un subscribe compatible con useSyncExternalStore
// - se añadió listener al set y se escuchó el evento storage para cambios cross-tab
// - se devolvió una función de cleanup que eliminó listener y el event listener
function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      listener();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

// almacena el tema en localStorage y notifica a los listeners registrados
function setStoredTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  for (const listener of listeners) {
    listener();
  }
}

// provee el ThemeProvider que usa useSyncExternalStore para suscribirse al almacenamiento
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  // sincroniza el atributo data-theme y la clase root cuando cambia el tema
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // alterna el tema escribiendo en localStorage (esto dispara listeners)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setStoredTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


