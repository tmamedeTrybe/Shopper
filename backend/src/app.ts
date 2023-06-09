import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { productsRoutes } from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => res.status(200).send('ok'));
app.use(productsRoutes);

export default app;