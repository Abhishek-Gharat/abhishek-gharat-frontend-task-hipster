import { useTheme } from '@/contexts/ThemeContext';
import { useProducts } from '@/hooks/useApi';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle, Sparkles, Zap, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { currentTheme } = useTheme();
  const { data: products, loading, error } = useProducts();
  const [visibleCount, setVisibleCount] = useState(9);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && products && visibleCount < products.length) {
      setVisibleCount((prev) => prev + 9);
    }
  }, [inView, products, visibleCount]);

  const getHeroContent = () => {
    switch (currentTheme) {
      case 'theme1':
        return {
          title: 'Discover Amazing Products',
          subtitle: 'Minimalist design meets powerful functionality',
          description: 'Experience our carefully curated collection of premium products with clean, modern aesthetics.'
        };
      case 'theme2':
        return {
          title: 'Premium Collection',
          subtitle: 'Elegance redefined for the modern professional',
          description: 'Indulge in our sophisticated selection of luxury items, crafted for those who appreciate timeless design and exceptional quality.'
        };
      case 'theme3':
        return {
          title: 'Fun & Vibrant Shopping! 🎉',
          subtitle: 'Where color meets creativity',
          description: 'Dive into our playful world of colorful products that bring joy and excitement to your everyday life!'
        };
    }
  };

  const hero = getHeroContent();

  const features = [
    { icon: Sparkles, title: 'Premium Quality', description: 'Only the finest products make it to our collection' },
    { icon: Zap, title: 'Fast Shipping', description: 'Lightning-fast delivery to your doorstep' },
    { icon: Heart, title: 'Customer Love', description: 'Thousands of happy customers worldwide' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-lg font-theme text-muted-foreground">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-theme font-semibold mb-2">Oops! Something went wrong</h2>
            <p className="text-muted-foreground font-theme mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className={`text-center space-y-4 sm:space-y-6 ${
        currentTheme === 'theme3' ? 'bg-gradient-theme rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-primary-foreground' : 
        currentTheme === 'theme2' ? 'border border-border rounded-lg p-6 sm:p-8 lg:p-12' : 
        'py-6 sm:py-8 lg:py-12'
      }`}>
        <h1 className={`font-theme font-bold leading-tight px-4 ${
          currentTheme === 'theme1' ? 'text-2xl sm:text-4xl lg:text-6xl' :
          currentTheme === 'theme2' ? 'text-3xl sm:text-5xl lg:text-7xl' :
          'text-2xl sm:text-4xl lg:text-5xl'
        } ${currentTheme === 'theme3' ? 'text-primary-foreground' : 'text-foreground'}`}>
          {hero.title}
        </h1>
        
        <p className={`font-theme max-w-2xl mx-auto px-4 ${
          currentTheme === 'theme1' ? 'text-lg sm:text-xl' :
          currentTheme === 'theme2' ? 'text-xl sm:text-2xl' :
          'text-base sm:text-lg'
        } ${currentTheme === 'theme3' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
          {hero.subtitle}
        </p>

        <p className={`font-theme max-w-3xl mx-auto leading-relaxed px-4 text-sm sm:text-base ${
          currentTheme === 'theme3' ? 'text-primary-foreground/80' : 'text-muted-foreground'
        }`}>
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-4 px-4">
          <Button 
            size="lg" 
            className={`font-theme w-full sm:w-auto ${currentTheme === 'theme3' ? 'rounded-full bg-background text-foreground hover:bg-background/90' : ''}`}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className={`text-center font-theme font-bold mb-6 sm:mb-8 ${
          currentTheme === 'theme1' ? 'text-2xl sm:text-3xl' :
          currentTheme === 'theme2' ? 'text-3xl sm:text-4xl' :
          'text-2xl sm:text-3xl'
        } text-foreground`}>
          Why Choose Us
        </h2>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`text-center hover:shadow-theme transition-all duration-theme animate-slide-in-left ${
                currentTheme === 'theme3' ? 'border-2 hover:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-3">
                <feature.icon className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-primary ${
                  currentTheme === 'theme3' ? 'w-14 h-14 sm:w-16 sm:h-16' : ''
                }`} />
                <CardTitle className="font-theme text-base sm:text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="font-theme text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h2 className={`text-center font-theme font-bold mb-6 sm:mb-8 ${
          currentTheme === 'theme1' ? 'text-2xl sm:text-3xl' :
          currentTheme === 'theme2' ? 'text-3xl sm:text-4xl' :
          'text-2xl sm:text-3xl'
        } text-foreground`}>
          Featured Products
        </h2>
        
        {/* Mobile-first responsive grid: 2 columns on mobile, 3 on tablet, 4 on large screens */}
        <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center`}>
          {products?.slice(0, visibleCount).map((product, index) => (
            <div key={product.id} className="w-full flex justify-center">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
        
        {/* Intersection Observer trigger for infinite scroll */}
        <div ref={ref} />

        <div className="text-center mt-8 sm:mt-12">
          {products && visibleCount < products.length && (
            <Button 
              size="lg" 
              variant="outline" 
              className={`font-theme ${currentTheme === 'theme3' ? 'rounded-full' : ''}`}
              onClick={() => setVisibleCount((prev) => prev + 9)}
            >
              View More Products
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;