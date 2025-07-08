import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-primary to-red-500 p-2 rounded-lg">
                <ApperIcon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-display font-bold">ShopFlow</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted online shopping destination for quality products at amazing prices.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Facebook" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Twitter" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Instagram" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Youtube" size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-primary transition-colors">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/electronics" className="text-gray-400 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-400 hover:text-primary transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/home-kitchen" className="text-gray-400 hover:text-primary transition-colors">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/category/books" className="text-gray-400 hover:text-primary transition-colors">
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <ApperIcon name="Phone" size={16} />
                <span>1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <ApperIcon name="Mail" size={16} />
                <span>support@shopflow.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <ApperIcon name="MapPin" size={16} />
                <span>123 Business Ave, City</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <ApperIcon name="Clock" size={16} />
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © 2024 ShopFlow. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;