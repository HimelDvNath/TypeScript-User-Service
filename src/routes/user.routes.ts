import { Router } from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/user.controller';


const router = Router();

// Route to create a new user
router.post('/users', createUser);

// Route to get all users
router.get('/users', getAllUsers);

// Route to get a specific user by ID
router.get('/users/:id', getUserById);

// Route to update a user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

export default router;