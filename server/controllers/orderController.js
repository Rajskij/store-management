import { getIO } from '../services/socketService.js';
import { getAllOrders, deleteOrderById, insertOrder } from '../db/db.js';

export async function getOrders(req, res) {
  try {
    const stores = await getAllOrders();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    await deleteOrderById(id);

    // Emit socket event after successful deletion
    const io = getIO();
    io.emit('orderDeleted', id);

    res.status(200).json({ message: 'Store deleted successfully', deletedId: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function createNewOrder(req, res) {
  try {
    const { store_id, store_name, items, total } = req.body;
    const newOrder = await insertOrder(store_id, store_name, items, total);

    // Emit socket event after successful creation
    const io = getIO();
    io.emit('orderCreated', newOrder);

    res.status(201).json({ message: 'Store created successfully', storeId: newOrder.lastId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
