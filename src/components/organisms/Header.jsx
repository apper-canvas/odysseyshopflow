import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { motion } from 'framer-motion';

const Header = ({ cartItemCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const categories = [
    { name: 'Electronics', icon: 'Smartphone' },
    { name: 'Fashion', icon: 'Shirt' },
    { name: 'Home & Kitchen', icon: 'Home' },
    { name: 'Books', icon: 'BookOpen' },
    { name: 'Sports', icon: 'Zap' },
    { name: 'Beauty', icon: 'Sparkles' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-primary to-red-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ApperIcon name="Truck" size={16} />
                Free shipping on orders above ₹500
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ApperIcon name="Phone" size={16} />
                Support: 1800-XXX-XXXX
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-primary to-red-500 p-2 rounded-lg">
              <ApperIcon name="ShoppingBag" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">
              ShopFlow
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="relative p-2">
                <ApperIcon name="ShoppingCart" size={24} />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="primary" 
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <div className="hidden md:flex items-center gap-6 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 whitespace-nowrap"
              >
                <ApperIcon name={category.icon} size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ApperIcon name={category.icon} size={16} className="text-primary" />
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;