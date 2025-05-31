import express from 'express';

import contactRoutes from './contacts.js';
import authRoutes from './auth.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/contacts', authenticate, contactRoutes);
router.use('/auth', authRoutes);

export default router;
