import { Contact } from '../db/models/contact.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments(filter),
    Contact.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
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
