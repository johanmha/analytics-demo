import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTracking, useEventTracking } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Lock } from 'lucide-react';

export const Checkout: React.FC = () => {
  usePageTracking('checkout');
  const navigate = useNavigate();
  const { track } = useEventTracking();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Track conversion
    track('purchase_complete', {
      value: 29,
      currency: 'USD',
      product: 'Analytics Pro Plan',
    });

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Purchase successful! (This is a demo)');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input id="email" type="email" required className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="you@example.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="card" className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <input id="card" type="text" required className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <input id="expiry" type="text" required className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium mb-2">
                      CVC
                    </label>
                    <input id="cvc" type="text" required className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isProcessing} size="lg" className="w-full text-base lg:text-lg">
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </Button>

            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Your payment information is secure and encrypted
            </p>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded p-2 text-white shrink-0">
                    <div className="text-xl">📈</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">Analytics Pro Plan</p>
                    <p className="text-xs text-muted-foreground">Monthly subscription</p>
                  </div>
                  <div className="font-semibold">$29</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$29.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-baseline">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">$29.00</span>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground pt-4">
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>Instant access after purchase</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
