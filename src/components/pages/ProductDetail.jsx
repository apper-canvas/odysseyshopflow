import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ProductService from '@/services/api/ProductService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getById(parseInt(id));
      setProduct(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      onAddToCart(product, quantity);
      navigate('/checkout');
      toast.info('Redirecting to checkout...');
    }
  };

  if (loading) return <Loading type="product-detail" />;
  if (error) return <Error message={error} onRetry={loadProduct} />;
  if (!product) return <Error message="Product not found" />;

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-gray-600">
        <button onClick={() => navigate('/')} className="hover:text-primary">
          Home
        </button>
        <ApperIcon name="ChevronRight" size={16} />
        <button onClick={() => navigate('/products')} className="hover:text-primary">
          Products
        </button>
        <ApperIcon name="ChevronRight" size={16} />
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              {product.featured && (
                <Badge variant="primary" className="absolute top-4 left-4 transform -rotate-2">
                  Featured
                </Badge>
              )}
              {discountPercentage && (
                <Badge variant="error" className="absolute top-4 right-4 transform rotate-2">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <ApperIcon name="Star" size={16} className="text-yellow-500 fill-current" />
                <span className="font-medium text-gray-700">4.5</span>
                <span className="text-gray-500">(120 reviews)</span>
              </div>
              <Badge variant="outline">
                {product.category}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercentage && (
                <Badge variant="success">
                  Save {discountPercentage}%
                </Badge>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <ApperIcon 
              name={product.stock > 0 ? "CheckCircle" : "XCircle"} 
              size={20} 
              className={product.stock > 0 ? "text-success" : "text-error"}
            />
            <span className={`font-medium ${product.stock > 0 ? "text-success" : "text-error"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2"
                >
                  <ApperIcon name="Minus" size={16} />
                </Button>
                <span className="font-semibold text-lg px-4">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2"
                >
                  <ApperIcon name="Plus" size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
              variant="primary"
            >
              <ApperIcon name="ShoppingCart" size={16} />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1"
              variant="secondary"
            >
              <ApperIcon name="Zap" size={16} />
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <ApperIcon name="Truck" size={16} className="text-primary" />
              <span className="text-sm text-gray-600">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="RefreshCw" size={16} className="text-primary" />
              <span className="text-sm text-gray-600">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Shield" size={16} className="text-primary" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Award" size={16} className="text-primary" />
              <span className="text-sm text-gray-600">Warranty</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;