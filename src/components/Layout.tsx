import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex h-16 items-center">
            <div className="flex items-center gap-3 mr-8 sm:mr-12">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground font-bold text-base">
                A
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">Analytics</span>
            </div>
            <nav className="flex items-center gap-6 flex-1">
              <Link
                to="/"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive('/')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Home
              </Link>
              <Link
                to="/product"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive('/product')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Product
              </Link>
              <Link
                to="/cart"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive('/cart')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Cart
              </Link>
              <Link
                to="/checkout"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive('/checkout')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Checkout
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};
