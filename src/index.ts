// import "reflect-metadata"
const express = require('express');
import { config } from "dotenv";
import connectToDB from './db';
import { Application, Request, Response } from "express";
const port: number =  Number(process.env.PORT) || 3000;

config();

const app: Application = express();
app.use(express.json());

// connectToDB();

app.get('/v1/tickers/marketprice', (_req: Request, res: Response) => {
    res.json({ res: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  
  