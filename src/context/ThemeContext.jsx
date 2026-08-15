import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const getInitialTheme = () => {
  return localStorage.getItem('app-theme') || 'earth';
};

const getInitialMode = () => {
  const savedMode = localStorage.getItem('app-mode');
  if (savedMode === 'dark') return true;
  return false;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [darkMode, setDarkMode] = useState(getInitialMode);

  // Update DOM and localStorage whenever theme/darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Set theme attribute
    root.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);

    // Set dark mode class
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('app-mode', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('app-mode', 'light');
    }
  }, [theme, darkMode]);

  const switchTheme = () => {
    setTheme((prev) => (prev === 'cyan' ? 'earth' : 'cyan'));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, switchTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
