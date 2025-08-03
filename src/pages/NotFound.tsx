import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { currentTheme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const getContent = () => {
    switch (currentTheme) {
      case 'theme1':
        return {
          title: '404 - Page Not Found',
          message: 'The page you\'re looking for doesn\'t exist.',
          button: 'Return Home'
        };
      case 'theme2':
        return {
          title: 'Page Not Located',
          message: 'We apologize, but the requested page could not be found.',
          button: 'Return to Homepage'
        };
      case 'theme3':
        return {
          title: 'Oops! Lost in Space! 🚀',
          message: 'This page went on an adventure and got lost! Let\'s get you back home.',
          button: 'Take Me Home! 🏠'
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`max-w-md w-full text-center animate-scale-in ${
        currentTheme === 'theme3' ? 'border-2' : ''
      }`}>
        <CardContent className="p-card space-y-6">
          <div className={`mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center ${
            currentTheme === 'theme3' ? 'animate-bounce' : ''
          }`}>
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          
          <div className="space-y-4">
            <h1 className={`font-theme font-bold text-foreground ${
              currentTheme === 'theme1' ? 'text-2xl' :
              currentTheme === 'theme2' ? 'text-3xl' :
              'text-2xl'
            }`}>
              {content.title}
            </h1>
            
            <p className="font-theme text-muted-foreground">
              {content.message}
            </p>
            
            <p className="font-theme text-sm text-muted-foreground">
              Requested path: <code className="bg-muted px-2 py-1 rounded text-xs">
                {location.pathname}
              </code>
            </p>
          </div>
          
          <Link to="/">
            <Button className={`font-theme w-full ${currentTheme === 'theme3' ? 'rounded-full' : ''}`}>
              <Home className="w-4 h-4 mr-2" />
              {content.button}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
