import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import CartItem from '@/components/molecules/CartItem';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = ({ isOpen, onClose, cartItems, products, onUpdateQuantity, onRemoveItem }) => {
  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find(p => p.Id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-display font-bold">Shopping Cart</h2>
              <Button variant="ghost" onClick={onClose} className="p-2">
                <ApperIcon name="X" size={24} />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="ShoppingCart" size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some products to get started</p>
                  <Button onClick={onClose} variant="primary">
                    <ApperIcon name="ShoppingBag" size={16} />
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = products.find(p => p.Id === item.productId);
                    return (
                      <CartItem
                        key={item.productId}
                        item={item}
                        product={product}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemove={onRemoveItem}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" variant="primary" asChild>
                    <Link to="/checkout" onClick={onClose}>
                      <ApperIcon name="CreditCard" size={16} />
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;