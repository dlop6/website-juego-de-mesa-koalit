"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

// se definió el tipo de tema usado en la app
type Theme = "dark" | "light";

// se definió la forma del contexto de tema
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";
const listeners = new Set<() => void>();

// se leyó el tema desde localStorage; se devolvió el valor por defecto en ssr
function readTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" ? "light" : "dark";
}

// se implementó un subscribe compatible con useSyncExternalStore
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

// se almacenó el tema en localStorage y se notificó a los listeners registrados
function setStoredTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  for (const listener of listeners) {
    listener();
  }
}

// se proveyó el ThemeProvider que usó useSyncExternalStore para suscribirse al almacenamiento
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  // se sincronizó el atributo data-theme y la clase root cuando cambió el tema
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // se alternó el tema escribiendo en localStorage (esto disparó listeners)
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

// se exportó un hook para consumir el contexto; se lanzó error si no se usó dentro del provider
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
}
