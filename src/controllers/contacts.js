import * as fs from 'node:fs/promises';
import path from 'node:path';

import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  replaceContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

// GET ALL
async function getContactsController(req, res) {
  // console.log(req.user);

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

// GET by ID
async function getContactByIdController(req, res) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user._id);
  // console.log(contact);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

// POST
async function createContactController(req, res) {
  let photo = null;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);

      await fs.unlink(req.file.path);

      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', 'photos', req.file.filename),
      );

      const port = getEnvVar('PORT');

      photo = `http://localhost:${port}/photos/${req.file.filename}`;
    }
  }

  // console.log(result);

  const contact = await createContact({
    ...req.body,
    userId: req.user._id,
    photo,
  });
  // console.log(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

//PATCH
async function updateContactController(req, res) {
  const { contactId } = req.params;

  let photo = null;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);

      await fs.unlink(req.file.path);

      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', 'photos', req.file.filename),
      );

      const port = getEnvVar('PORT');

      photo = `http://localhost:${port}/photos/${req.file.filename}`;
    }
  }

  const updateDataContact = {
    ...req.body,
    ...(photo && { photo }),
  };

  const result = await updateContact(
    contactId,
    updateDataContact,
    req.user._id,
  );
  // console.log(result);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

//DELETE
async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const result = await deleteContact(contactId, req.user._id);
  // console.log(result);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).end();
}

//PUT
async function replaceContactController(req, res) {
  const { contactId } = req.params;

  const { value, updatedExisting } = await replaceContact(
    contactId,
    req.body,
    req.user._id,
  );

  if (updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Contact update successfully',
      data: value,
    });
  }

  res
    .status(201)
    .json({ status: 201, message: 'Contact create sucessfully', data: value });
}

export {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
  replaceContactController,
};
