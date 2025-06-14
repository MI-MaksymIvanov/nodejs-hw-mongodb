function parseType(type) {
  if (typeof type !== 'string') {
    return undefined;
  }

  const typesValid = ['work', 'home', 'personal'];
  if (!typesValid.includes(type)) {
    return undefined;
  }

  return type;
}

function parseIsFavourite(value) {
  if (typeof value === 'string') {
    return value === 'true';
  }
  if (typeof value === 'boolean') {
    return value;
  }

  return undefined;
}

export function parseFilterParams({ contactType, isFavourite }) {
  const filter = {};

  const parsedType = parseType(contactType);
  if (parsedType !== undefined) {
    filter.contactType = parsedType;
  }

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  if (parsedIsFavourite !== undefined) {
    filter.isFavourite = parsedIsFavourite;
  }

  return filter;
}
