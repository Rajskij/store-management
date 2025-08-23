import express from 'express';
import {
  getOrders,
  deleteOrder,
  createNewOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders', getOrders)
router.post('/order', createNewOrder);
router.delete('/order/:id', deleteOrder);

export default router;
