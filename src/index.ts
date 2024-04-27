import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port: number =  Number(process.env.PORT) || 3000;


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  
  