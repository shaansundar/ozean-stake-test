import { createContext, useState, useContext } from "react";

type TabContextProps = {
  tab: "bridge" | "stake" | "explore";
  toggleTab: (tab: "bridge" | "stake" | "explore") => void;
};

const TabContext = createContext<TabContextProps>({
  tab: "bridge",
  toggleTab: (tab: "bridge" | "stake" | "explore") => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const TabProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [tab, setTab] = useState<"bridge" | "stake" | "explore">("bridge");

  const toggleTab = (tab: "bridge" | "stake" | "explore") => {
    setTab(tab);
  };

  return (
    <TabContext.Provider value={{ tab, toggleTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);
