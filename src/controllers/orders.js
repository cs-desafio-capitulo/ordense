import ProductService from '../services/product';
import Order from '../models/order';

export const OrdersController = (OrderModel) => ({
  async create(req, res) {
    let { products } = req.body;

    if (!products) {
      return res.status(400).json({ message: 'No products were sent' });
    }

    const order = Promise.all(products.map(async (product) => {
      let productFromApi = await ProductService.getProductFromService(product.product_id);
      product.status = false;

      if (productFromApi.product[0].quantity >= product.quantity && productFromApi.product[0].active) {
        productFromApi.product[0].quantity -= product.quantity;
        ProductService.updateProduct(product.product_id, Object.assign({}, productFromApi.product[0]));
        product.status = true;
      }
      
      product.total_cost = parseFloat(productFromApi.product[0].price) * parseFloat(product.quantity);
      return product;
    }))
      .then(products => {
        req.body.status = products.filter(p => p.status === false).length > 0 ? 'denied' : 'approved';
        req.body.total_cost = products.map(p => p.total_cost).reduce((previousValue, currentValue) => previousValue + currentValue);
        req.body.products = products;

        return req.body;
      });

      try {
        const newOrder = OrderModel.create(await order);

        return res.status(201).json(await newOrder);
      } catch (error) {
        return res.status(400).json({message: error});
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
