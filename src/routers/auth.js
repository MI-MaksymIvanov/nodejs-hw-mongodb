import express from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  sendResetEmailCotroller,
  resetPasswordController,
  getOAuthUrlController,
  confirmOAuthController,
} from '../controllers/auth.js';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
  confirmOAuthSchema,
} from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

//register
router.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

// login
router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

// refresh
router.post('/refresh', ctrlWrapper(refreshController));

// logout
router.post('/logout', ctrlWrapper(logoutController));

//send-reset-email
router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailCotroller),
);

// reset-pwd
router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

// get-oauth-url
router.get('/get-oauth-url', ctrlWrapper(getOAuthUrlController));

// confirm-oauth
router.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(confirmOAuthSchema),
  ctrlWrapper(confirmOAuthController),
);

export default router;
