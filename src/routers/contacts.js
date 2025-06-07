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
import { upload } from '../middlewares/upload.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

const router = express.Router();
const jsonParser = express.json();

// роут GET /contacts
router.get('/', ctrlWrapper(getContactsController));

// роут GET /contacts/:contactId
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// роут POST
router.post(
  '/',
  upload.single('photo'),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// роут PATCH
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

// роут DELETE
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

// роут PUT
router.put(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(replaceContactController),
);

export default router;
