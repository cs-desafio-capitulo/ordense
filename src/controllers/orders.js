import ProductService from '../services/product';
import Order from '../models/order';

export const OrdersController = (OrderModuel) => ({
  async create(req, res) {
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({ message: 'No products were sent' });
    }
  },
  
  async getById(req, res) {
    const order = await this.Order.find({ _id: req.params.id });
    try {
      if (!order) return res.status(200).json([]);

      return res.status(200).json(foundOrder);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    };
  }
});

export default OrdersController(Order);
