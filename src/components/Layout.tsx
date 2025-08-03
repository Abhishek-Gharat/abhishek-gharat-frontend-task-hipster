import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentTheme, isTransitioning } = useTheme();

  return (
    <div className={`min-h-screen bg-background font-theme transition-all duration-theme ${
      isTransitioning ? 'animate-theme-switch' : ''
    }`}>
      {/* Theme 1: Default Layout */}
      {currentTheme === 'theme1' && (
        <>
          <Header />
          <main className="pt-header min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </div>
          </main>
        </>
      )}

      {/* Theme 2: Sidebar Layout */}
      {currentTheme === 'theme2' && (
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 overflow-hidden min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full w-full">
              {children}
            </div>
          </main>
        </div>
      )}

      {/* Theme 3: Grid Layout */}
      {currentTheme === 'theme3' && (
        <>
          <Header />
          <main className="pt-header min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Layout;