import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  // роут GET /contacts
  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  // роут GET /contacts/:contactId
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const data = await getContactById(contactId);
    console.log(data);

    if (!data) {
      res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfuly found contact with id ${contactId}`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
