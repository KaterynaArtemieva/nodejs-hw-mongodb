import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';

export const setupServer = () => {

    const PORT = Number(env('PORT', '3000'));

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
            target: 'pino-pretty',
        },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
          message: 'Hello world!',
        });
      });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}