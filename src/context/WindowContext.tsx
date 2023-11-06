import { ReactNode, createContext, useState } from "react";

export const WindowContext = createContext<{
  popUpWindow: Window | null;
  onOpenPopUpWindow: (targetWindow: Window) => void;
  closePopUpWindow: () => void;
}>({
  popUpWindow: null,
  onOpenPopUpWindow: () => {},
  closePopUpWindow: () => {},
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const [popUpWindow, setPopUpWindow] = useState<Window | null>(null);

  const onOpenPopUpWindow = (targetWindow: Window) => {
    setPopUpWindow(targetWindow);
  };

  const closePopUpWindow = () => {
    if (popUpWindow) {
      popUpWindow.close();
      setPopUpWindow(null);
    }
  };

  return (
    <WindowContext.Provider
      value={{ popUpWindow, onOpenPopUpWindow, closePopUpWindow }}>
      {children}
    </WindowContext.Provider>
  );
}
