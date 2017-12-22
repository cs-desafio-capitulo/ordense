import express from 'express';
import OrdersController from '../controllers/orders';
import Order from '../models/order';

const router = express.Router();
const ordersController = new OrdersController(Order);

router
  .get('/:id', (req, res) => ordersController.getById(req, res))
  .post('/', (req, res) => ordersController.create(req, res))

export default router;
