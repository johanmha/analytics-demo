import { useNavigate } from 'react-router-dom';
import { usePageTracking, useEventTracking } from '../hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export const Product: React.FC = () => {
  usePageTracking('product');
  const navigate = useNavigate();
  const { track } = useEventTracking();

  const handleAddToCart = () => {
    track('add_to_cart', {
      product: 'Analytics Pro Plan',
      price: 29,
    });
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-0 text-white">
          <CardContent className="p-8 lg:p-12">
            <div className="text-5xl lg:text-6xl mb-4">📈</div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Analytics Pro</h2>
            <p className="text-base lg:text-lg opacity-90 mb-8">Complete analytics solution for modern applications</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Unlimited page views</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Real-time dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>A/B testing included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Cookie-free tracking</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">Analytics Pro Plan</h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl lg:text-5xl font-bold text-primary">$29</span>
              <span className="text-xl lg:text-2xl text-muted-foreground">/month</span>
            </div>
          </div>

          <div className="space-y-5">
            <Card className="border-l-4 border-l-indigo-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Privacy-First</CardTitle>
                <CardDescription>No cookies, no personal data collection. Fully GDPR, CCPA, and PECR compliant out of the box.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Easy Setup</CardTitle>
                <CardDescription>Add one script tag and you're done. No complex configuration required.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-pink-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Powerful Insights</CardTitle>
                <CardDescription>Track conversions, run experiments, and understand your funnel with actionable data.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full text-base lg:text-lg">
            Add to Cart
          </Button>

          <p className="text-sm text-muted-foreground text-center">30-day money-back guarantee</p>
        </div>
      </div>

      <Card className="mt-16 lg:mt-24">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl text-center">What You Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center space-y-2">
              <div className="text-4xl">∞</div>
              <h4 className="font-semibold">Unlimited Events</h4>
              <p className="text-sm text-muted-foreground">Track as many events as you need</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🔒</div>
              <h4 className="font-semibold">Data Ownership</h4>
              <p className="text-sm text-muted-foreground">Your data stays on your servers</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">⚡</div>
              <h4 className="font-semibold">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">Sub-1ms tracking overhead</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
