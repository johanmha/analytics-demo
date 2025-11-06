import { useNavigate } from 'react-router-dom';
import { useFeatureValue } from '@growthbook/growthbook-react';
import { usePageTracking, useEventTracking } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Cookie, TrendingUp, FlaskConical } from 'lucide-react';

export const Landing: React.FC = () => {
  usePageTracking('landing');
  const navigate = useNavigate();
  const { track } = useEventTracking();

  const heroVariant = useFeatureValue<'control' | 'variant'>('hero-test', 'control');
  const buttonTextVariant = heroVariant === 'variant' ? 'Explore Features' : 'View Product';
  const handleCTA = () => {
    track(`hero_click_${heroVariant}`, {
      location: 'hero',
      button_text: buttonTextVariant,
    });
    navigate('/product');
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Cookie-Free Analytics Made Simple</h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-white/90 px-4">Privacy-first analytics that help you understand your users without compromising their data.</p>
            <div className="pt-4">
              <Button onClick={handleCTA} size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8">
                {buttonTextVariant} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="text-center mb-16 sm:mb-20 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Why Choose Our Analytics?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Everything you need for privacy-compliant, powerful analytics</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <Card className="border-2 hover:border-indigo-200 transition-all hover:shadow-lg">
            <CardHeader className="p-10">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Cookie className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle className="text-xl mb-3">Cookie-Free</CardTitle>
              <CardDescription className="text-base leading-relaxed">No cookies means no consent banners. Track users while respecting privacy laws.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-all hover:shadow-lg">
            <CardHeader className="p-10">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">Real-Time Data</CardTitle>
              <CardDescription className="text-base leading-relaxed">See your analytics update in real-time. Make decisions based on current data.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-pink-200 transition-all hover:shadow-lg">
            <CardHeader className="p-10">
              <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <FlaskConical className="h-8 w-8 text-pink-600" />
              </div>
              <CardTitle className="text-xl mb-3">A/B Testing Built-In</CardTitle>
              <CardDescription className="text-base leading-relaxed">Test variants and track results automatically. Optimize your conversion funnel.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="bg-muted/50 py-20 sm:py-24 lg:py-32">
        <div className="w-full max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10">Join thousands of developers who trust our analytics platform.</p>
          <Button onClick={handleCTA} size="lg" className="text-base sm:text-lg px-8 sm:px-10">
            Explore Our Product <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
