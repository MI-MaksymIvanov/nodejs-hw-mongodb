import express from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  replaceContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

// роут GET /contacts
router.get('/', ctrlWrapper(getContactsController));

// роут GET /contacts/:contactId
router.get('/:contactId', ctrlWrapper(getContactByIdController));

// роут POST
router.post('/', jsonParser, ctrlWrapper(createContactController));

// роут PATCH
router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactController));

// роут DELETE
router.delete('/:contactId', ctrlWrapper(deleteContactController));

// роут PUT
router.put('/:contactId', jsonParser, ctrlWrapper(replaceContactController));

export default router;
