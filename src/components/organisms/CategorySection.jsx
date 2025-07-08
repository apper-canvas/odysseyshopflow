import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const CategorySection = () => {
  const categories = [
    {
      name: 'Electronics',
      icon: 'Smartphone',
      description: 'Latest gadgets and tech',
      color: 'from-blue-500 to-purple-600',
      items: '2,500+ items'
    },
    {
      name: 'Fashion',
      icon: 'Shirt',
      description: 'Trendy clothes and accessories',
      color: 'from-pink-500 to-red-600',
      items: '5,000+ items'
    },
    {
      name: 'Home & Kitchen',
      icon: 'Home',
      description: 'Everything for your home',
      color: 'from-green-500 to-teal-600',
      items: '1,800+ items'
    },
    {
      name: 'Books',
      icon: 'BookOpen',
      description: 'Knowledge at your fingertips',
      color: 'from-orange-500 to-yellow-600',
      items: '3,200+ items'
    },
    {
      name: 'Sports',
      icon: 'Zap',
      description: 'Fitness and outdoor gear',
      color: 'from-purple-500 to-indigo-600',
      items: '900+ items'
    },
    {
      name: 'Beauty',
      icon: 'Sparkles',
      description: 'Cosmetics and skincare',
      color: 'from-pink-500 to-purple-600',
      items: '1,500+ items'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of products across different categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
                  <div className={`bg-gradient-to-br ${category.color} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-4 -mb-4"></div>
                    
                    <div className="relative z-10">
                      <ApperIcon name={category.icon} size={48} className="mb-4" />
                      <h3 className="text-2xl font-display font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">
                          {category.items}
                        </span>
                        <ApperIcon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;