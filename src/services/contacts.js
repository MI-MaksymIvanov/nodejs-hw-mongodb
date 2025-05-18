import { Contact } from '../db/models/contact.js';

export function getAllContacts() {
  return Contact.find();
}

export function getContactById(contactId) {
  return Contact.findById(contactId);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function updateContact(contactId, payload) {
  return Contact.findByIdAndUpdate(contactId, payload, { new: true });
}

export function createContact(payload) {
  return Contact.create(payload);
}

export async function replaceContact(contactId, contact) {
  const result = await Contact.findByIdAndUpdate(contactId, contact, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    values: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}
