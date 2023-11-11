import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "",
  setTheme: (theme: string) => {
    // eslint-disable-next-line no-console
    console.log("ThemeContext: ", theme);
  },
});

export default ThemeContext;
