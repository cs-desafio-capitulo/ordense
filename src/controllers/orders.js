import ProductService from '../services/orders';

class OrdersController {
  constructor(Order) {
    this.productService = ProductService;
    this.Order = Order;
  }
  
  // TODO: Implement middleware to verify if user is already authenticated
  // TODO: Update the request's products on product's database (by product's service)
  /**
   * Responsible for creating a new order into database
   * @param {*} req 
   * @param {*} res 
   */
  async create(req, res) {
    const orderData = req.body;
    const products = orderData.products;

    if (!products) {
      return res.status(400).json({ message: 'No products were sent' });
    }

    return Promise.all(products.map(async (product) => {
      let productFromAPI = await this.productService.prototype.getProductFromService(product.product_id);
      
      if (!productFromAPI.product) {
        product.status = false;
        product.total_cost = 0;
        return product;
      }
      
      if (productFromAPI.product[0].quantity < product.quantity) {
        product.status = false;
      } else {
        product.status = true;
        productFromAPI.product[0].quantity -= parseInt(product.quantity);
      }

      product.total_cost = parseFloat(productFromAPI.product[0].price) * parseInt(product.quantity);

      return product;
    })).then(async (product) => {
      orderData.products = await product;
      orderData.status = await product.filter(productItem => productItem.status == false).length > 0 ? "denied" : "approved";
      orderData.total_cost = orderData.products.map(item => item.total_cost).reduce((accumulated, currentValue) => accumulated + currentValue);
      

      const order = new this.Order(orderData);
      return order.save(async (err, savedOrder) => {
        if (err) return res.status(400).json({ message: err.message });

        return res.status(201).json(savedOrder);
      })
    });
  }

  /**
   * Responsible for searching an order, based on its _id
   * @param {*} req 
   * @param {*} res 
   */
  async getById(req, res) {
    this.Order.find({ _id: req.params.id }, (error, foundOrder) => {
      if (error) return res.status(400).json({ message: error.message });

      return res.status(201).json(foundOrder);
    });
  }
}

export default OrdersController;
