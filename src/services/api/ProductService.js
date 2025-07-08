import productsData from '@/services/mockData/products.json';

class ProductService {
  static async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...productsData]);
      }, 300);
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = productsData.find(p => p.Id === id);
        if (product) {
          resolve({ ...product });
        } else {
          reject(new Error('Product not found'));
        }
      }, 200);
    });
  }

  static async getByCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = productsData.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
        resolve([...filteredProducts]);
      }, 300);
    });
  }

  static async search(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchResults = productsData.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...searchResults]);
      }, 300);
    });
  }

  static async getFeatured() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = productsData.filter(p => p.featured);
        resolve([...featured]);
      }, 300);
    });
  }

  static async create(product) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          ...product,
          Id: Math.max(...productsData.map(p => p.Id)) + 1,
          createdAt: new Date().toISOString()
        };
        productsData.push(newProduct);
        resolve({ ...newProduct });
      }, 400);
    });
  }

  static async update(id, productData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = productsData.findIndex(p => p.Id === id);
        if (index !== -1) {
          productsData[index] = { ...productsData[index], ...productData };
          resolve({ ...productsData[index] });
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = productsData.findIndex(p => p.Id === id);
        if (index !== -1) {
          const deletedProduct = productsData.splice(index, 1)[0];
          resolve({ ...deletedProduct });
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  }
}

export default ProductService;