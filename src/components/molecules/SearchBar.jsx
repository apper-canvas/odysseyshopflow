import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search for products..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-l-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-base"
        />
      </div>
      <Button 
        type="submit" 
        variant="primary" 
        className="rounded-l-none border-l-0 px-8"
      >
        <ApperIcon name="Search" size={20} />
      </Button>
    </form>
  );
};

export default SearchBar;