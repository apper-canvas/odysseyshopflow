import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Layout Components
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import CartSidebar from '@/components/organisms/CartSidebar';

// Pages
import Home from '@/components/pages/Home';
import Products from '@/components/pages/Products';
import ProductDetail from '@/components/pages/ProductDetail';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import OrderSuccess from '@/components/pages/OrderSuccess';

// Hooks and Services
import useCart from '@/hooks/useCart';
import ProductService from '@/services/api/ProductService';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemCount
  } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    
    // Add bounce animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      cartIcon.classList.add('cart-bounce');
      setTimeout(() => {
        cartIcon.classList.remove('cart-bounce');
      }, 800);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header 
          cartItemCount={getItemCount()}
          onCartClick={() => setIsCartSidebarOpen(true)}
        />
        
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<Home onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/products" 
              element={<Products onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/search" 
              element={<Products onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/category/:category" 
              element={<Products onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetail onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems}
                  products={products}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cartItems={cartItems}
                  products={products}
                  onClearCart={clearCart}
                />
              } 
            />
            <Route 
              path="/order-success/:orderId" 
              element={<OrderSuccess />} 
            />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Cart Sidebar */}
        <CartSidebar
          isOpen={isCartSidebarOpen}
          onClose={() => setIsCartSidebarOpen(false)}
          cartItems={cartItems}
          products={products}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
        
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
};

export default App;