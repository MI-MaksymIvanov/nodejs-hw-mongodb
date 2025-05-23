function parseSortBy(value) {
  if (typeof value === 'undefined') {
    return '_id';
  }

  const keys = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createAt',
    'updatedAt',
  ];

  if (keys.includes(value) !== true) {
    return '_id';
  }

  return value;
}

function pasreSortOrder(value) {
  if (typeof value === 'undefined') {
    return 'asc';
  }
  if (value !== 'asc' && value !== 'desc') {
    return 'asc';
  }

  return value;
}

export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const pasredSortOrder = pasreSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: pasredSortOrder,
  };
}
