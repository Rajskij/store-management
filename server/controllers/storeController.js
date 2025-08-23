import { getIO } from '../services/socketService.js';
import { getAllStores, deleteStoreById, insertStore } from '../db/db.js';

export async function getStores(req, res) {
  try {
    const stores = await getAllStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function deleteStore(req, res) {
  try {
    const id = req.params.id;
    await deleteStoreById(id);

    // Emit socket event after successful deletion
    const io = getIO();
    io.emit('storeDeleted', id);

    res.status(200).json({ message: 'Store deleted successfully', deletedId: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function createNewStore(req, res) {
  try {
    const { name, address, phone, city } = req.body;
    const newStore = await insertStore(name, address, phone, city);

    // Emit socket event after successful creation
    const io = getIO();
    io.emit('storeCreated', { id: newStore.lastID, ...req.body });

    res.status(201).json({ message: 'Store created successfully', storeId: newStore.lastId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
