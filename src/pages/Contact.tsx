import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Design Street', 'Creative District', 'New York, NY 10001']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@multi-theme-switcher.com', 'support@multi-theme-switcher.com']
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: currentTheme === 'theme3' ? "Woohoo! Message sent! 🎉" : "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const getHeroContent = () => {
    switch (currentTheme) {
      case 'theme1':
        return {
          title: 'Get in Touch',
          subtitle: 'We\'d love to hear from you',
          description: 'Have a question, suggestion, or just want to say hello? Drop us a message and we\'ll get back to you promptly.'
        };
      case 'theme2':
        return {
          title: 'Connect With Us',
          subtitle: 'Distinguished service awaits',
          description: 'We take pride in providing exceptional customer service. Allow us the privilege of assisting you with your inquiries.'
        };
      case 'theme3':
        return {
          title: 'Let\'s Chat! 💬',
          subtitle: 'We love making new friends!',
          description: 'Got something awesome to share? Want to say hi? Or need help with something? We\'re all ears and super excited to hear from you!'
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

      {/* Contact Grid */}
      <section className={`grid gap-8 ${
        currentTheme === 'theme1' ? 'lg:grid-cols-2' :
        currentTheme === 'theme2' ? 'lg:grid-cols-2' :
        'lg:grid-cols-2'
      }`}>
        {/* Contact Form */}
        <Card className={`hover:shadow-theme transition-all duration-theme ${
          currentTheme === 'theme3' ? 'border-2' : ''
        }`}>
          <CardHeader>
            <CardTitle className="font-theme flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-theme">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className={`font-theme ${currentTheme === 'theme3' ? 'rounded-lg' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-theme">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className={`font-theme ${currentTheme === 'theme3' ? 'rounded-lg' : ''}`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-theme">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                  className={`font-theme ${currentTheme === 'theme3' ? 'rounded-lg' : ''}`}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="font-theme">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more..."
                  rows={5}
                  required
                  className={`font-theme resize-none ${currentTheme === 'theme3' ? 'rounded-lg' : ''}`}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-theme ${currentTheme === 'theme3' ? 'rounded-full' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {currentTheme === 'theme3' ? 'Send Message! 🚀' : 'Send Message'}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <Card 
              key={info.title} 
              className={`hover:shadow-theme transition-all duration-theme animate-slide-in-left ${
                currentTheme === 'theme3' ? 'border-2 hover:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-card">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-primary/10 ${
                    currentTheme === 'theme3' ? 'rounded-full' : ''
                  }`}>
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-theme font-semibold text-foreground mb-2 ${
                      currentTheme === 'theme2' ? 'text-lg' : ''
                    }`}>
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="font-theme text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
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
            Frequently Asked Questions
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 text-left">
            <div>
              <h3 className="font-theme font-semibold text-foreground mb-2">
                How quickly do you respond?
              </h3>
              <p className="font-theme text-muted-foreground text-sm">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
            
            <div>
              <h3 className="font-theme font-semibold text-foreground mb-2">
                Do you offer phone support?
              </h3>
              <p className="font-theme text-muted-foreground text-sm">
                Yes! Call us during business hours for immediate assistance with urgent matters.
              </p>
            </div>
            
            <div>
              <h3 className="font-theme font-semibold text-foreground mb-2">
                Can I schedule a meeting?
              </h3>
              <p className="font-theme text-muted-foreground text-sm">
                Absolutely! Mention your preferred time in your message and we'll coordinate.
              </p>
            </div>
            
            <div>
              <h3 className="font-theme font-semibold text-foreground mb-2">
                What about technical support?
              </h3>
              <p className="font-theme text-muted-foreground text-sm">
                Our technical team is available to help with any platform-related questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;