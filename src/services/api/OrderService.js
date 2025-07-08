let ordersData = [];

class OrderService {
  static async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...ordersData]);
      }, 300);
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = ordersData.find(o => o.Id === id);
        if (order) {
          resolve({ ...order });
        } else {
          reject(new Error('Order not found'));
        }
      }, 200);
    });
  }

  static async create(orderData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          ...orderData,
          Id: ordersData.length > 0 ? Math.max(...ordersData.map(o => o.Id)) + 1 : 1,
          createdAt: new Date().toISOString(),
          status: orderData.status || 'pending'
        };
        ordersData.push(newOrder);
        resolve({ ...newOrder });
      }, 500);
    });
  }

  static async update(id, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = ordersData.findIndex(o => o.Id === id);
        if (index !== -1) {
          ordersData[index] = { ...ordersData[index], ...updateData };
          resolve({ ...ordersData[index] });
        } else {
          reject(new Error('Order not found'));
        }
      }, 300);
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = ordersData.findIndex(o => o.Id === id);
        if (index !== -1) {
          const deletedOrder = ordersData.splice(index, 1)[0];
          resolve({ ...deletedOrder });
        } else {
          reject(new Error('Order not found'));
        }
      }, 300);
    });
  }
}

export default OrderService;