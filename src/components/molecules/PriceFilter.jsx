import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const PriceFilter = ({ onPriceChange, minPrice, maxPrice }) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || '');

  const handleApplyFilter = () => {
    const min = localMinPrice ? parseFloat(localMinPrice) : null;
    const max = localMaxPrice ? parseFloat(localMaxPrice) : null;
    onPriceChange(min, max);
  };

  const handleClearFilter = () => {
    setLocalMinPrice('');
    setLocalMaxPrice('');
    onPriceChange(null, null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ApperIcon name="DollarSign" size={20} />
        Price Range
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price
          </label>
          <Input
            type="number"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(e.target.value)}
            placeholder="₹0"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price
          </label>
          <Input
            type="number"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(e.target.value)}
            placeholder="₹999999"
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleApplyFilter}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            Apply
          </Button>
          <Button 
            onClick={handleClearFilter}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;