import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import OrderService from '@/services/api/OrderService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await OrderService.getById(parseInt(orderId));
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadOrder} />;
  if (!order) return <Error message="Order not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-success to-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="CheckCircle" size={48} className="text-white" />
        </motion.div>

        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order. We've received your order and will process it shortly.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg border p-8 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">Order Number</h3>
              <p className="text-primary font-mono text-lg">#{order.Id.toString().padStart(6, '0')}</p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">Order Date</h3>
              <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Shipping Address</h3>
            <div className="text-gray-600">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Order Total</h3>
            <div className="text-2xl font-bold text-primary">
              ₹{order.total.toLocaleString()}
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ApperIcon name="Package" size={20} className="text-primary" />
              <div>
                <div className="font-medium">Processing</div>
                <div className="text-gray-600">We're preparing your order</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Truck" size={20} className="text-primary" />
              <div>
                <div className="font-medium">Shipping</div>
                <div className="text-gray-600">Your order will be shipped</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Home" size={20} className="text-primary" />
              <div>
                <div className="font-medium">Delivered</div>
                <div className="text-gray-600">Enjoy your purchase!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" asChild>
            <Link to="/products">
              <ApperIcon name="ShoppingBag" size={16} />
              Continue Shopping
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.print()}>
            <ApperIcon name="Printer" size={16} />
            Print Order
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;