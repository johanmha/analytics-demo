import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GrowthBookProvider } from './components/GrowthBookProvider';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <GrowthBookProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Router>
    </GrowthBookProvider>
  );
}

export default App;
