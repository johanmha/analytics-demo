import { useNavigate } from 'react-router-dom';
import { usePageTracking, useEventTracking } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

export const Cart: React.FC = () => {
  usePageTracking('cart');
  const navigate = useNavigate();
  const { track } = useEventTracking();

  const handleCheckout = () => {
    track('checkout_start', {
      cart_value: 29,
    });
    navigate('/checkout');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-10">Shopping Cart</h1>

      <Card className="mb-8">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-3 sm:p-4 text-white shrink-0">
                <div className="text-2xl sm:text-3xl">📈</div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold">Analytics Pro Plan</h3>
                <p className="text-sm text-muted-foreground mt-1">Monthly subscription</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Check className="h-3 w-3" /> Unlimited page views
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Check className="h-3 w-3" /> Real-time dashboard
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Check className="h-3 w-3" /> A/B testing included
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="text-xl sm:text-2xl font-bold">$29.00</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>$29.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg sm:text-xl font-bold">
              <span>Total</span>
              <span>$29.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleCheckout} size="lg" className="w-full text-base lg:text-lg">
        Proceed to Checkout
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-6">Secure checkout • 30-day money-back guarantee</p>

      <div className="mt-12 sm:mt-16">
        <Separator className="mb-8 sm:mb-10" />
        <h3 className="text-lg font-semibold mb-6 sm:mb-8 text-center">Why Customers Love Us</h3>
        <div className="grid grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl mb-2">🔒</div>
            <p className="text-xs sm:text-sm font-medium">Secure Payment</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl mb-2">💯</div>
            <p className="text-xs sm:text-sm font-medium">30-Day Guarantee</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl mb-2">⚡</div>
            <p className="text-xs sm:text-sm font-medium">Instant Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};
