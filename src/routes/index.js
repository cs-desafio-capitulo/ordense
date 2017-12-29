import express from 'express';
import orderRoutes from './order';

const router = express.Router();

router.get('/', (req, res) => res.status(404).json({ message: 'Not found' }));

router.use('/order', orderRoutes);

export default router;
