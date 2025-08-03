import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const { currentTheme } = useTheme();

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Globe, label: 'Countries Served', value: '50+' },
    { icon: Award, label: 'Awards Won', value: '25' },
    { icon: Target, label: 'Years Experience', value: '15' }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on quality and ensure every product meets our high standards.'
    },
    {
      title: 'Customer Centric',
      description: 'Our customers are at the heart of everything we do, driving our innovation and service.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and reducing our environmental impact.'
    },
    {
      title: 'Innovation',
      description: 'We constantly evolve and innovate to bring you the latest and greatest products.'
    }
  ];

  const getHeroContent = () => {
    switch (currentTheme) {
      case 'theme1':
        return {
          title: 'About Multi-Theme Switcher',
          subtitle: 'Building the future of e-commerce',
          description: 'We are a modern e-commerce platform dedicated to providing exceptional shopping experiences through innovative technology and thoughtful design.'
        };
      case 'theme2':
        return {
          title: 'Our Distinguished Legacy',
          subtitle: 'Crafting excellence since 2008',
          description: 'With over a decade of experience in premium retail, we have established ourselves as a trusted curator of exceptional products for discerning customers worldwide.'
        };
      case 'theme3':
        return {
          title: 'Hey There! Welcome to Our Story! 🌟',
          subtitle: 'Where passion meets creativity',
          description: 'We are a fun-loving team of dreamers and doers who believe shopping should be an adventure filled with joy, discovery, and amazing surprises!'
        };
    }
  };

  const hero = getHeroContent();

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className={`text-center space-y-6 ${
        currentTheme === 'theme3' ? 'bg-gradient-theme rounded-3xl p-12 text-primary-foreground' : 
        currentTheme === 'theme2' ? 'border border-border rounded-lg p-12' : 
        'py-12'
      }`}>
        <h1 className={`font-theme font-bold leading-tight ${
          currentTheme === 'theme1' ? 'text-4xl md:text-5xl' :
          currentTheme === 'theme2' ? 'text-5xl md:text-6xl' :
          'text-4xl md:text-5xl'
        } ${currentTheme === 'theme3' ? 'text-primary-foreground' : 'text-foreground'}`}>
          {hero.title}
        </h1>
        
        <p className={`font-theme max-w-2xl mx-auto ${
          currentTheme === 'theme1' ? 'text-xl' :
          currentTheme === 'theme2' ? 'text-2xl' :
          'text-lg'
        } ${currentTheme === 'theme3' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
          {hero.subtitle}
        </p>

        <p className={`font-theme max-w-3xl mx-auto leading-relaxed ${
          currentTheme === 'theme3' ? 'text-primary-foreground/80' : 'text-muted-foreground'
        }`}>
          {hero.description}
        </p>
      </section>

      {/* Stats Section */}
      <section>
        <div className={`grid gap-6 ${
          currentTheme === 'theme1' ? 'grid-cols-2 md:grid-cols-4' :
          currentTheme === 'theme2' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
          'grid-cols-2 md:grid-cols-4'
        }`}>
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className={`text-center hover:shadow-theme transition-all duration-theme animate-scale-in ${
                currentTheme === 'theme3' ? 'border-2 hover:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-card">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 text-primary ${
                  currentTheme === 'theme3' ? 'w-12 h-12' : ''
                }`} />
                <div className={`font-theme font-bold text-foreground ${
                  currentTheme === 'theme1' ? 'text-2xl' :
                  currentTheme === 'theme2' ? 'text-3xl' :
                  'text-2xl'
                }`}>
                  {stat.value}
                </div>
                <div className="font-theme text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className={`${
        currentTheme === 'theme2' ? 'border border-border rounded-lg p-8' :
        currentTheme === 'theme3' ? 'bg-accent rounded-3xl p-8' :
        'bg-secondary rounded-lg p-8'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className={`font-theme font-bold ${
            currentTheme === 'theme1' ? 'text-3xl' :
            currentTheme === 'theme2' ? 'text-4xl' :
            'text-3xl'
          } text-foreground`}>
            Our Mission
          </h2>
          
          <p className={`font-theme leading-relaxed ${
            currentTheme === 'theme1' ? 'text-lg' :
            currentTheme === 'theme2' ? 'text-xl' :
            'text-lg'
          } text-foreground`}>
            {currentTheme === 'theme1' && 
              "To democratize access to high-quality products through innovative technology and exceptional user experience. We believe that great design and functionality should be accessible to everyone."
            }
            {currentTheme === 'theme2' && 
              "To curate and deliver the finest selection of premium products to discerning customers who appreciate craftsmanship, heritage, and timeless elegance. Excellence is not just our standard—it is our promise."
            }
            {currentTheme === 'theme3' && 
              "To spread joy and creativity through amazing products that inspire, delight, and bring color to people's lives! We believe shopping should be fun, and life should be full of wonderful surprises! 🎈"
            }
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className={`text-center font-theme font-bold mb-8 ${
          currentTheme === 'theme1' ? 'text-3xl' :
          currentTheme === 'theme2' ? 'text-4xl' :
          'text-3xl'
        } text-foreground`}>
          Our Values
        </h2>
        
        <div className={`grid gap-6 ${
          currentTheme === 'theme1' ? 'grid-cols-1 md:grid-cols-2' :
          currentTheme === 'theme2' ? 'grid-cols-1 lg:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2'
        }`}>
          {values.map((value, index) => (
            <Card 
              key={value.title} 
              className={`hover:shadow-theme transition-all duration-theme animate-slide-in-left ${
                currentTheme === 'theme3' ? 'border-2 hover:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="font-theme flex items-center gap-3">
                  <Badge variant="secondary" className="font-theme">
                    {String(index + 1).padStart(2, '0')}
                  </Badge>
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-theme text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center">
        <h2 className={`font-theme font-bold mb-6 ${
          currentTheme === 'theme1' ? 'text-3xl' :
          currentTheme === 'theme2' ? 'text-4xl' :
          'text-3xl'
        } text-foreground`}>
          Meet Our Team
        </h2>
        
        <p className={`font-theme max-w-2xl mx-auto mb-8 ${
          currentTheme === 'theme1' ? 'text-lg' :
          currentTheme === 'theme2' ? 'text-xl' :
          'text-lg'
        } text-muted-foreground`}>
          {currentTheme === 'theme1' && 
            "We are a diverse team of passionate individuals united by our commitment to excellence and innovation."
          }
          {currentTheme === 'theme2' && 
            "Our distinguished team combines decades of expertise with an unwavering dedication to craftsmanship and service."
          }
          {currentTheme === 'theme3' && 
            "We are a colorful bunch of creative minds who love what we do and put our hearts into everything we create! 💖"
          }
        </p>

        <div className={`inline-flex items-center justify-center p-8 ${
          currentTheme === 'theme3' ? 'bg-gradient-theme rounded-full' :
          currentTheme === 'theme2' ? 'border border-border rounded-lg' :
          'bg-secondary rounded-lg'
        }`}>
          <Users className={`text-primary ${
            currentTheme === 'theme3' ? 'w-16 h-16 text-primary-foreground' : 'w-12 h-12'
          }`} />
        </div>
      </section>
    </div>
  );
};

export default About;