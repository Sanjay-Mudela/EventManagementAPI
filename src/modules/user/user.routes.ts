import express from 'express';
import {
  createUserController,
  getAllUsersController,
} from './user.controller';

const router = express.Router();

router.post('/create', createUserController);
router.get('/all', getAllUsersController);

export default router;
