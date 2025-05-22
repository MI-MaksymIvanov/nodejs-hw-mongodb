import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  console.log(req.params.id);

  if (isValidObjectId(req.params.id) !== true) {
    return next(createHttpError.BadRequest('Id should be an OcjectId'));
  }

  next();
}
