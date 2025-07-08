import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category === selectedCategory ? null : category);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ApperIcon name="Filter" size={20} />
        Categories
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
            !selectedCategory 
              ? 'bg-gradient-to-r from-primary to-red-500 text-white' 
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-primary to-red-500 text-white' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;