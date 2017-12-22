class OrdersController {
  constructor(Order) {
    this.Order = Order;
  }

  async create(req, res) {
    if (!req.body.product) {
      return res.status(400).json({ message: 'No products were sent'});
    }

    const order = new this.Order(req.body);
    await order.save((error, newOrder) => {
      if (error) return res.status(400).json({ message: error.message });

      return res.status(201).json(newOrder);
    });
  }

  async getById(req, res) {
    await this.Order.find({ _id: req.params.id }, (error, foundOrder) => {
      if (error) return res.status(400).json({ message: error.message });
      
      return res.status(201).json(foundOrder)
    });
  }
}

export default OrdersController;
