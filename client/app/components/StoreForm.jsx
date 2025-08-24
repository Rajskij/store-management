'use client'

import { useEffect, useState, useRef } from 'react';
import { useSocket } from '../hooks/useSocket';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StoreForm() {
    const [stores, setStores] = useState([]);
    const [formData, setFormData] = useState({
        name: 'New Store',
        address: '777 Oak Rd',
        phone: '343-5465',
        city: 'New York City'
    });

    const { socket } = useSocket();

    useEffect(() => {
        // Fetch list of stores from DB
        async function fetchStores() {
            const response = await fetch(`${API_URL}/stores`);
            const json = await response.json();

            setStores(json);
        }
        fetchStores()
    }, [])

    useEffect(() => {
        if (!socket) return;

        socket.on('storeCreated', (data) => {
            setStores(prev => [...prev, { ...data }]);
        })
        socket.on('storeDeleted', (id) => {
            setStores(prev => prev.filter(s => s.id !== parseInt(id)));
        })

        return () => {
            socket.off('storeCreated');
            socket.off('storeDeleted');
        }
    }, [socket]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`${API_URL}/store`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();

        setFormData({ name: '', address: '', phone: '', city: '' });
    };

    async function handleDelete(id) {
        const response = await fetch(`${API_URL}/store/${id}`, {
            method: "DELETE"
        });
        const json = await response.json();
    }

    return (
        <div className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Store Information</h2>
            <form onSubmit={handleSubmit} className="w-full p-6 rounded-xl shadow-md grid grid-cols-2 gap-x-4">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">
                        Store Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-1/2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-muted"
                >
                    Save Store
                </button>
            </form>

            {stores.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Saved Stores</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stores.map(store => (
                            <div key={store.id} className="p-4 rounded shadow-md">
                                <h4 className="font-bold text-lg">{store.name}</h4>
                                <p>{store.address}</p>
                                <p>{store.phone}</p>
                                <p>{store.city}</p>
                                <button
                                    onClick={() => handleDelete(store.id)}
                                    className="bg-secondary text-white mt-2 py-2 px-4 rounded-xl hover:bg-secondary-muted"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {stores.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No stores yet. Click "Save Store" to create one!</p>
                </div>
            )}
        </div>
    );
}
