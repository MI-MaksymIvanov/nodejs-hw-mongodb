import createHttpError from 'http-errors';

import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export async function authenticate(req, res, next) {
  //   console.log(req.headers);
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(new createHttpError.Unauthorized('Pls provide access token'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(new createHttpError.Unauthorized('Pls provide access token'));
  }
  //   console.log({ bearer, accessToken });

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(new createHttpError.Unauthorized('Session not found'));
  }
  // перевірка чи не протермінований токен
  if (session.accessTokenValidUntil < new Date()) {
    return next(new createHttpError.Unauthorized('Access token expired'));
  }

  const user = await User.findOne({ _id: session.userId });

  if (user === null) {
    return next(new createHttpError.Unauthorized('User not found'));
  }
  // додавання на req поля user
  req.user = { _id: user._id, name: user.name };

  next();
}
