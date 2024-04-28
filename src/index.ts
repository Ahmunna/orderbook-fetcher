// import "reflect-metadata"
const express = require('express');
import { config } from "dotenv";
import connectToDB from './db';
import { Application } from "express";
const port: number =  Number(process.env.PORT) || 3000;
const tickersRoutes = require('./routes/tickers');

config();
const app: Application = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

// connectToDB();

app.use('/v1/tickers', tickersRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  
  