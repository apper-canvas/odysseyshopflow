import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '@/components/molecules/CartItem';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';
import { motion } from 'framer-motion';

const Cart = ({ cartItems, products, onUpdateQuantity, onRemoveItem }) => {
  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find(p => p.Id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Empty
          title="Your cart is empty"
          message="Looks like you haven't added any items to your cart yet."
          actionText="Start Shopping"
          onAction={() => window.location.href = '/products'}
          icon="ShoppingCart"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold gradient-text mb-8">
          Shopping Cart ({itemCount} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = products.find(p => p.Id === item.productId);
              return (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItem
                    item={item}
                    product={product}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg border p-6 sticky top-8"
            >
              <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold text-success">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{Math.round(cartTotal * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" variant="primary" asChild>
                  <Link to="/checkout">
                    <ApperIcon name="CreditCard" size={16} />
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/products">
                    <ApperIcon name="ArrowLeft" size={16} />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="Shield" size={16} className="text-success" />
                    Secure 256-bit SSL encryption
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="Truck" size={16} className="text-success" />
                    Free shipping on orders above ₹500
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="RefreshCw" size={16} className="text-success" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;