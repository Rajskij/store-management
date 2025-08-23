import express from 'express';
import {
  getStores,
  deleteStore,
  createNewStore
} from '../controllers/storeController.js';

const router = express.Router();

router.get('/stores', getStores)
router.post('/store', createNewStore);
router.delete('/store/:id', deleteStore);

export default router;