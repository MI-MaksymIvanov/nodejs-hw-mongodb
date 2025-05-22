import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  replaceContact,
} from '../services/contacts.js';

async function getContactsController(req, res) {
  const contacts = await getAllContacts();
  console.log(contacts);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

async function getContactByIdController(req, res) {
  const contactId = req.params.id;

  const contact = await getContactById(contactId);
  console.log(contact);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfuly found contact with id ${contactId}`,
    data: contact,
  });
}

async function createContactController(req, res) {
  const contact = await createContact(req.body);
  console.log(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfuly created a contact!',
    data: contact,
  });
}

async function updateContactController(req, res) {
  const contactId = req.params.id;

  const result = await updateContact(contactId, req.body);
  console.log(result);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

async function deleteContactController(req, res) {
  const contactId = req.params.id;

  const result = await deleteContact(contactId);
  console.log(result);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).end();
}

async function replaceContactController(req, res) {
  const contactId = req.params.id;

  const { value, updatedExisting } = await replaceContact(contactId, req.body);

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
