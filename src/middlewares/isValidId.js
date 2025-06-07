import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  // console.log(req.params);

  if (isValidObjectId(req.params.contactId) !== true) {
    return next(createHttpError.BadRequest('Id should be an OcjectId'));
  }

  next();
}
