import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const CartItem = ({ item, product, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.productId, newQuantity);
  };

  if (!product) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
      <img 
        src={product.images[0]} 
        alt={product.title}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-display font-semibold text-gray-900 mb-1">
          {product.title}
        </h4>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 min-w-[32px] h-8"
            >
              <ApperIcon name="Minus" size={14} />
            </Button>
            
            <span className="font-semibold text-lg px-3">
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 min-w-[32px] h-8"
            >
              <ApperIcon name="Plus" size={14} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.productId)}
            className="text-error hover:bg-red-50 p-2"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-bold text-gray-900">
          ₹{(product.price * item.quantity).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CartItem;