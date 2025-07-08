import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/organisms/ProductGrid';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import PriceFilter from '@/components/molecules/PriceFilter';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import ProductService from '@/services/api/ProductService';
import { toast } from 'react-toastify';

const Products = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, priceRange, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getAll();
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(product => product.category))];
      setCategories(uniqueCategories);
      
      // Apply search filter if present
      const searchQuery = searchParams.get('q');
      if (searchQuery) {
        const searchResults = data.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(searchResults);
      } else {
        setFilteredProducts(data);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply search filter
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price filter
    if (priceRange.min !== null) {
      filtered = filtered.filter(product => product.price >= priceRange.min);
    }
    if (priceRange.max !== null) {
      filtered = filtered.filter(product => product.price <= priceRange.max);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: null, max: null });
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Filter" size={16} />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Sort Options */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="ArrowUpDown" size={20} />
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-accent focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <PriceFilter
            onPriceChange={handlePriceChange}
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
          />

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            <ApperIcon name="X" size={16} />
            Clear All Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            onRetry={loadProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;