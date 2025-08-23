import { open } from "sqlite";
import sqlite3 from "sqlite3";

let db;

export async function initDb() {
    db = await open({
        filename: ":memory:",
        driver: sqlite3.Database
    })

    // Create Stores table
    await db.exec(`
        CREATE TABLE stores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          phone TEXT NOT NULL,
          city TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create Orders table
    await db.exec(`
        CREATE TABLE orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          store_id INTEGER,
          store_name TEXT NOT NULL,
          order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          items INTEGER NOT NULL,
          total DECIMAL NOT NULL,
          status TEXT DEFAULT 'pending',
          FOREIGN KEY (store_id) REFERENCES stores (id)
        );
    `);

    // Insert sample data
    await db.run(`
        INSERT INTO stores (name, address, phone, city) 
        VALUES 
        ('Store A', '123 Main St', '555-0101', 'New York'),
        ('Store B', '456 Oak Ave', '555-0102', 'Los Angeles'),
        ('Store C', '789 Pine Rd', '555-0103', 'Chicago'),
        ('Store D', '101 Maple Blvd', '555-0104', 'Miami'),
        ('Store E', '202 Cedar Ln', '555-0105', 'Seattle');
    `);

    // Insert sample orders
    await db.run(`
        INSERT INTO orders (store_id, store_name, items, total, status)
        VALUES
        (1, 'Store A', 3, 45.99, 'completed'),
        (2, 'Store B', 2, 28.50, 'pending'),
        (3, 'Store C', 5, 92.75, 'processing');
    `);
}

// Store queries
export async function getAllStores() {
    return await db.all('SELECT * FROM stores ORDER BY name');
}

export async function insertStore(name, address, phone, city) {
    const result = await db.run(
        "INSERT INTO stores (name, address, phone, city) VALUES (?, ?, ?, ?)",
        [name, address, phone, city]
    );
    return result;
}

export async function deleteStoreById(storeId) {
    const result = await db.run("DELETE FROM stores WHERE id = ?", [storeId]);
    return result;
}

// Order queries
export async function getAllOrders() {
    return await db.all(`
        SELECT * 
        FROM orders 
        WHERE store_id IN (SELECT id FROM stores)
        ORDER BY order_date DESC
    `);
}

export async function insertOrder(storeId, storeName, items, total) {
    const insertedRow = await db.get(
        `INSERT INTO orders (store_id, store_name, items, total) 
         VALUES (?, ?, ?, ?)
         RETURNING *`,
        [storeId, storeName, items, total]
    );
    
    return insertedRow;
    // const result = await db.get(
    //     "INSERT INTO orders (store_id, store_name, items, total) VALUES (?, ?, ?, ?)",
    //     [storeId, storeName, items, total]
    // );
    // return result;
}

export async function deleteOrderById(orderId) {
    const result = await db.run("DELETE FROM orders WHERE id = ?", [orderId]);
    return result;
}

// Start DB
await initDb();
