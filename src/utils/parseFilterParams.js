function parseType(type) {
  if (typeof type !== 'string') {
    return undefined;
  }

  const isValid = ['work', 'home', 'personal'].includes(type);
  return isValid ? type : undefined;
}

function parseIsFavourite(value) {
  if (typeof value === 'string') return value === 'true';
  if (typeof value === 'boolean') return value;
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
