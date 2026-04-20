import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import CheckoutSuccess from './pages/CheckoutSuccess';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
              <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/orders/success" element={
                  <ProtectedRoute>
                    <CheckoutSuccess />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg gradient-btn flex items-center justify-center text-white font-bold text-sm">S</div>
                    <span className="font-bold gradient-text text-lg" style={{fontFamily:'Outfit,sans-serif'}}>ShopApp</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} ShopApp — Built with ❤️ using React & Node.js
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    All systems operational
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
