import { Router } from 'express';
import { getUsers, getUser  } from '../controllers/user.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers );
userRouter.get('/:id', authorize ,getUser );
// userRouter.post('/', createUser);
// userRouter.put('/:id',putUser);
// userRouter.delete('/:id', deleteUser);

export default userRouter;
