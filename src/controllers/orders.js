class OrdersController {
  constructor(Order) {
    this.Order = Order;
  }

  async create(req, res) {
    
    const order = new this.Order(req.body);
    await order.save((error, newOrder) => {
      if (error) return res.status(400).send(error.message);

      return res.status(200).send(order);
    });
  }
}

export default OrdersController;