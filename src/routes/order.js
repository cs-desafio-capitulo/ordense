import express from 'express';
import OrdersController from '../controllers/orders';
import Order from '../models/order';

const router = express.Router();

router
  .get('/:id', OrdersController.getById)
  .post('/', OrdersController.create);

export default router;
