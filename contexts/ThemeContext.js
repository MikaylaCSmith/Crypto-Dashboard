import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    primary: '#e8b4b8', 
    secondary: '#eed6d3', 
    accent: '#a49393', 
    background: 'rgba(30, 30, 30, 0.95)',
    cardBackground: 'rgba(42, 42, 42, 0.75)',
    glassBorder: 'rgba(232, 180, 184, 0.2)', 
    glassBlur: 'rgba(238, 214, 211, 0.1)', 
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    error: '#FF4B4B',
    shadow: 'rgba(232, 180, 184, 0.3)', 
  },
  light: {
    primary: '#e8b4b8', 
    secondary: '#eed6d3', 
    accent: '#a49393', 
    background: 'rgba(245, 245, 245, 0.95)',
    cardBackground: 'rgba(255, 255, 255, 0.75)',
    glassBorder: 'rgba(164, 147, 147, 0.2)', 
    glassBlur: 'rgba(238, 214, 211, 0.1)', 
    text: '#1E1E1E',
    textSecondary: 'rgba(30, 30, 30, 0.7)',
    error: '#D32F2F',
    shadow: 'rgba(164, 147, 147, 0.3)', 
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 