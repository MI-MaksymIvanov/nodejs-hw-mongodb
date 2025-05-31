import { Contact } from '../db/models/contact.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filters = { ...filter, userId };

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments(filters),
    Contact.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
}

// GET by ID
export function getContactById(contactId, userId) {
  return Contact.findOne({ _id: contactId, userId });
}

//DELETE
export function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({ _id: contactId, userId });
}

//PATCH
export function updateContact(contactId, payload, userId) {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
  });
}

// POST
export function createContact(payload) {
  return Contact.create(payload);
}

//PUT
export async function replaceContact(contactId, contact, userId) {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
      upsert: true,
      includeResultMetadata: true,
    },
  );

  return {
    values: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}
