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
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

const router = express.Router();
const jsonParser = express.json();

// роут GET /contacts
router.get('/', ctrlWrapper(getContactsController));

// роут GET /contacts/:contactId
router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

// роут POST
router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// роут PATCH
router.patch(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

// роут DELETE
router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

// роут PUT
router.put(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(replaceContactController),
);

export default router;
