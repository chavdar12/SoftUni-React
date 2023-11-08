import './App.scss';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Root } from '#routes';
import { ThemeContext } from '#utils';

function App() {
  const { i18n } = useTranslation();

  const getDefaultTheme = useCallback(() => {
    const localStorageTheme = localStorage.getItem('default-theme');
    return localStorageTheme || 'light';
  }, []);

  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => {
    localStorage.setItem('default-theme', theme);
    const language = localStorage.getItem('selectedLanguage');
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Root />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
