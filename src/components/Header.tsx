import { useTheme } from '@/contexts/ThemeContext';
import { themeConfigs, ThemeType } from '@/types/theme';
import { ChevronDown, Palette, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { currentTheme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-header bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-theme">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between min-w-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-theme rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Palette className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="font-theme font-bold text-xl text-foreground truncate">
            Multi-Theme Switcher
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-theme transition-colors duration-200 relative group text-sm lg:text-base ${
                location.pathname === link.path
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg z-50 md:hidden animate-fade-in">
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-6 py-3 font-theme text-base border-b border-border last:border-b-0 ${
                    location.pathname === link.path
                      ? 'text-primary font-semibold bg-accent'
                      : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Theme Switcher */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="font-theme transition-all duration-theme hover:shadow-theme bg-background border-border"
              >
                <Palette className="w-4 h-4 mr-2" />
                {themeConfigs[currentTheme].name}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-card/95 backdrop-blur-sm border-border font-theme z-50 shadow-lg"
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
      </div>
    </header>
  );
};

export default Header;