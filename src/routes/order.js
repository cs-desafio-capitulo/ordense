import express from 'express';
import OrdersController from '../controllers/orders';
import Order from '../models/order';

const router = express.Router();
const ordersController = new OrdersController(Order);

router.get('/', (req, res) => {
  res.send('orders');
})
export default router;
