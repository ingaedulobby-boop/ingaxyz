import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface MinimizedWindow {
  id: string;
  title: string;
}

interface WindowManagerContextType {
  minimizedWindows: MinimizedWindow[];
  minimizeWindow: (id: string, title: string) => void;
  restoreWindow: (id: string) => void;
  isMinimized: (id: string) => boolean;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [minimizedWindows, setMinimizedWindows] = useState<MinimizedWindow[]>([]);

  const minimizeWindow = useCallback((id: string, title: string) => {
    setMinimizedWindows((prev) => {
      if (prev.find((w) => w.id === id)) return prev;
      return [...prev, { id, title }];
    });
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setMinimizedWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const isMinimized = useCallback(
    (id: string) => minimizedWindows.some((w) => w.id === id),
    [minimizedWindows]
  );

  return (
    <WindowManagerContext.Provider value={{ minimizedWindows, minimizeWindow, restoreWindow, isMinimized }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("WindowManagerProvider missing");
  return ctx;
}
