import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  title = "No items found", 
  message = "There are no items to display at the moment.",
  actionText = "Browse Products",
  onAction,
  icon = "Package"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-8 mb-6">
        <ApperIcon name={icon} size={64} className="text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="flex items-center gap-2"
        >
          <ApperIcon name="ShoppingBag" size={16} />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;