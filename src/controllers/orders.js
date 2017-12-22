class OrdersController {
  constructor(Order) {
    this.Order = Order;
  }

  // TODO: Verificar se o usuário tá autenticado

  async create(req, res) {
    let products = req.body.product;
    if (!products) {
      return res.status(400).json({ message: 'No products were sent' });
    }

    // TODO: Verificar, cada item de product, seu status (Consumindo do serviço de products)
    // Se a verificação estiver ok, a order segue com o status 'approved'; Caso contrário, 'denied'

    products.map(product => {
      // Busco o produto no serviço de produto
      // Retorno esse produto para o array de produtos, incluindo sua quantidade
      fetch(`url do serviço de produtos/${product.id}`)
        .then(productDetail => product = productDetail)
        .catch(error => console.log(error));
    });

    const order = new this.Order(req.body);
    return order.save((error, newOrder) => {
      if (error) return res.status(400).json({ message: error.message });

      return res.status(201).json(newOrder);
    });
  }

  async getById(req, res) {
    await this.Order.find({ _id: req.params.id }, (error, foundOrder) => {
      if (error) return res.status(400).json({ message: error.message });

      return res.status(201).json(foundOrder);
    });
  }
}

export default OrdersController;
