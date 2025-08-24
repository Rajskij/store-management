import express from "express";
import dotenv from "dotenv/config";
import http from "http";
import cors from "cors";
import { configureSocketIO } from './config/socketio.js';
import { setIOInstance } from './services/socketService.js';
import storeRouter from './routes/store.js';
import orderRouter from './routes/order.js';
import paymentRouter from './routes/payment.js';

// Setup Express, Http Server and Socket.io
const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

// Configure and setup Socket.IO instance
const io = configureSocketIO(server);
setIOInstance(io); 

// Cors for http request
app.use(cors())
app.use(express.json());

// Rest APIs
app.use(storeRouter);
app.use(orderRouter);
app.use(paymentRouter);

// Start Server
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
