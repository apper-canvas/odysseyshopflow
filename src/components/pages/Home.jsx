import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/organisms/HeroSection';
import CategorySection from '@/components/organisms/CategorySection';
import FeaturedProducts from '@/components/organisms/FeaturedProducts';
import ProductService from '@/services/api/ProductService';
import { toast } from 'react-toastify';

const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts 
        products={products} 
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;