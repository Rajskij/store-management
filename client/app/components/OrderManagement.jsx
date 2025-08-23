'use client'

import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { getColor } from '../lib/utils.js';

export default function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [stores, setStores] = useState([]);
    const [selectedStoreId, setSelectedStoreId] = useState();
    const { socket } = useSocket();

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch('http://localhost:4000/orders');
            const json = await response.json();
            console.log(json)

            setOrders(json);
        }
        async function fetchStores() {
            const response = await fetch('http://localhost:4000/stores');
            const json = await response.json();

            setStores(json);
            setSelectedStoreId(json && json[0]?.id);
        }
        fetchOrders();
        fetchStores()
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('orderCreated', (order) => {
            console.log(order);
            setOrders(prev => [...prev, { ...order }]);
        });

        socket.on('orderDeleted', (id) => {
            setOrders(prev => prev.filter(order => order.id !== parseInt(id)));
        });

        return () => {
            socket.off('orderCreated');
            socket.off('orderDeleted');
        }
    }, [socket]);

    const createNewOrder = () => {
        const randomStore = stores[Math.floor(Math.random() * stores.length)];
        const newOrder = {
            id: Date.now(),
            store: randomStore,
            date: new Date().toLocaleString(),
            items: Math.floor(Math.random() * 5) + 1,
            total: (Math.random() * 100).toFixed(2)
        };

        setOrders([newOrder, ...orders]);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // store_id, store_name, items, total

        const store = stores.find(store => store.id === parseInt(selectedStoreId));
        const newOrder = { 
            store_id: store.id, 
            store_name: store.name, 
            items: Math.floor(Math.random() * 5) + 1, 
            total: (Math.random() * 100).toFixed(2)
        };

        const response = await fetch(`http://localhost:4000/order`, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();

    }

    async function handleDelete(id) {
        const response = await fetch(`http://localhost:4000/order/${id}`, {
            method: "DELETE"
        });
        const json = await response.json();
    }

    return (
        <div className="pt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Management</h2>
                <form onSubmit={handleSubmit} className="rounded-xl shadow-md grid grid-cols-2 gap-4 items-center px-4 py-2">
                    <select
                        id="stores"
                        className='border border-gray-300 rounded-md p-2 w-full'
                        value={selectedStoreId}
                        onChange={(e) => setSelectedStoreId(e.target.value)}
                        required
                    >
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-secondary text-white w-full px-4 py-2 rounded-md hover:bg-secondary-muted"
                    >
                        New Order
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded shadow-md border-l-6 border-secondary">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className='flex gap-4'>
                                    <h3 className="font-bold text-lg">{order.store_name}</h3>
                                    <span className={`${getColor(order)} text-xs font-semibold px-2.5 py-0.5 my-auto rounded`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-gray-600">{order.order_date}</p>
                                <p>{order.items} items | ${order.total}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(order.id)}
                                className='bg-red-200 hover:bg-red-400 text-xs font-semibold py-1 px-3 rounded'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p>No orders yet. Click "New Order" to create one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
