import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  sendResetEmail,
  resetPassword,
  loginOrRegister,
} from '../services/auth.js';

import { getOAuthUrl, validateCode } from '../utils/googleOAuth.js';

// register
export async function registerController(req, res) {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
}

// login
export async function loginController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
}

// refresh
export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
}

// logout
export async function logoutController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId, refreshToken);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
}

// send-reset-email
export async function sendResetEmailCotroller(req, res) {
  const { email } = req.body;

  // console.log(email);
  await sendResetEmail(email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
}

// reset-pwd
export async function resetPasswordController(req, res) {
  const { password, token } = req.body;

  // console.log({ password, token });
  await resetPassword(password, token);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
}

// get-oauth-url
export async function getOAuthUrlController(req, res) {
  const url = getOAuthUrl();

  res.status(200).json({
    status: 200,
    message: 'Successfully get OAuth URL',
    data: {
      oauth_ulr: url,
    },
  });
}

//confirm-oauth
export async function confirmOAuthController(req, res) {
  // console.log(req.body.code);

  const ticket = await validateCode(req.body.code);

  const session = await loginOrRegister(
    ticket.payload.email,
    ticket.payload.name,
  );

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Login with Google successfully',
    data: { accessToken: session.accessToken },
  });
}
