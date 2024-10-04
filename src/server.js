import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';


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

      app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
    
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
      });

      app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
          const contact = await getContactById(contactId);   
          
          if (!contact) {
            res.status(404).json({
                status: 404,
                message: 'Contact not found'
            });
            return;
          }
      
          res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
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