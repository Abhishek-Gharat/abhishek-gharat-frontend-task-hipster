import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeType } from '@/types/theme';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('theme1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as ThemeType;
    if (savedTheme && ['theme1', 'theme2', 'theme3'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    // Remove existing theme classes
    document.documentElement.removeAttribute('data-theme');
    
    // Apply new theme
    if (currentTheme !== 'theme1') {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    // Save to localStorage
    localStorage.setItem('app-theme', currentTheme);
    
    // Add transition class to body for smooth theme switching
    document.body.classList.add('theme-transitioning');
    
    // Remove transition class after animation completes
    const timeout = setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 600);

    return () => clearTimeout(timeout);
  }, [currentTheme]);

  const setTheme = (theme: ThemeType) => {
    if (theme === currentTheme) return;
    
    setIsTransitioning(true);
    
    // Add a slight delay to show transition effect
    setTimeout(() => {
      setCurrentTheme(theme);
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        isTransitioning
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};