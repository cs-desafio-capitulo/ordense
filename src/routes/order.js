import express from 'express';
import OrdersController from '../controllers/orders';
import Order from '../models/order';

const router = express.Router();
const ordersController = new OrdersController(Order);

const BASE_URL = '/orders';

router.get('/', (req, res) => {
  res.send('orders');
})

.post('/', (req, res) => ordersController.create(req, res));

export default router;
