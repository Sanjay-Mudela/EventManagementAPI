import { Request, Response } from 'express';
import { createUser, getAllUsers } from './user.model';
import { createUserSchema } from './user.schema';

export const createUserController = async (req: Request, res: Response) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { name, email } = parsed.data;

  try {
    const newUser = await createUser(name, email);
    return res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('Create User Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.json({ users });
  } catch (err) {
    console.error('Get Users Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
