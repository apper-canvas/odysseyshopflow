import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="product-card cursor-pointer group"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.featured && (
          <Badge variant="primary" className="absolute top-3 left-3 transform -rotate-2">
            Featured
          </Badge>
        )}
        
        {discountPercentage && (
          <Badge variant="error" className="absolute top-3 right-3 transform rotate-2">
            {discountPercentage}% OFF
          </Badge>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="error" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <ApperIcon name="Star" size={16} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">4.5</span>
            <span className="text-sm text-gray-500">(120)</span>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
          variant="primary"
        >
          <ApperIcon name="ShoppingCart" size={16} />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;