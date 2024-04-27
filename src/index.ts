import express, { Request, Response, Application } from 'express';
import dotenv from "dotenv";
import connectToDB from './db';
const port: number =  Number(process.env.PORT) || 3000;


const app: Application = express();
dotenv.config();
app.use(express.json());

// connectToDB();

app.get('/', (req: Request, res: Response) => {
    res.json({ res: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  
  