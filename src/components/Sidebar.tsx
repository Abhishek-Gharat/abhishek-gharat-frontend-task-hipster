import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { themeConfigs } from '@/types/theme';
import { Home, User, Mail, Palette, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Sidebar = () => {
  const { currentTheme, setTheme } = useTheme();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (currentTheme !== 'theme2') return null;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-theme ${
          isCollapsed ? 'w-14 sm:w-16' : 'w-56 sm:w-64'
        } md:relative md:translate-x-0 ${
          isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-theme rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-theme font-bold text-lg text-foreground">
                Multi-Theme Switcher
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-accent"
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {/* Theme Switcher for Sidebar */}
          {!isCollapsed && (
            <div className="mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full font-theme transition-all duration-theme hover:shadow-theme bg-background border-border"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    {themeConfigs[currentTheme].name}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-full bg-card/95 backdrop-blur-sm border-border font-theme z-50 shadow-lg"
                >
                  {Object.values(themeConfigs).map((theme) => (
                    <DropdownMenuItem
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`cursor-pointer transition-colors duration-200 ${
                        currentTheme === theme.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{theme.name}</span>
                        <span className="text-xs opacity-75">{theme.description}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground shadow-theme'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-theme font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-accent rounded-lg">
            <p className="text-sm text-accent-foreground font-theme">
              Dark theme with elegant serif typography for a premium experience.
            </p>
          </div>
        )}
      </aside>

      {/* Mobile Toggle Button */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-50 md:hidden bg-background border-border"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;