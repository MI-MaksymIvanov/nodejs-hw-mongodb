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

export function parseFilterParams({ type, isFavourite }) {
  const filter = {};

  const parsedType = parseType(type);
  if (parsedType !== undefined) {
    filter.contactType = parsedType;
  }

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  if (parsedIsFavourite !== undefined) {
    filter.isFavourite = parsedIsFavourite;
  }

  return filter;
}
