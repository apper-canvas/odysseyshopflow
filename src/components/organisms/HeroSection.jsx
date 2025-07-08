import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-red-500 to-secondary text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight">
              Shop the Future
              <span className="block text-yellow-300">Today</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-100 max-w-lg">
              Discover amazing products at unbeatable prices. Your perfect shopping experience starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button variant="accent" className="px-8 py-4 text-lg">
                  <ApperIcon name="ShoppingBag" size={20} />
                  Start Shopping
                </Button>
              </Link>
              
              <Link to="/deals">
                <Button variant="outline" className="px-8 py-4 text-lg bg-white/10 border-white/30 hover:bg-white hover:text-primary">
                  <ApperIcon name="Tag" size={20} />
                  View Deals
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-gray-200">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-gray-200">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99%</div>
                <div className="text-gray-200">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <ApperIcon name="Truck" size={40} className="mx-auto mb-3 text-yellow-300" />
                  <h3 className="font-semibold mb-2">Free Shipping</h3>
                  <p className="text-sm text-gray-200">On orders above ₹500</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <ApperIcon name="Shield" size={40} className="mx-auto mb-3 text-yellow-300" />
                  <h3 className="font-semibold mb-2">Secure Payment</h3>
                  <p className="text-sm text-gray-200">100% Safe & Secure</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <ApperIcon name="RefreshCw" size={40} className="mx-auto mb-3 text-yellow-300" />
                  <h3 className="font-semibold mb-2">Easy Returns</h3>
                  <p className="text-sm text-gray-200">30-day return policy</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <ApperIcon name="Headphones" size={40} className="mx-auto mb-3 text-yellow-300" />
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-sm text-gray-200">Always here to help</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;