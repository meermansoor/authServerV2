import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {res.send({title: 'user'})});
userRouter.get('/:id', (req, res) => {res.send({title: 'GET specific user'})});
userRouter.post('/', (req, res) => {res.send({title: 'CREATE new user'})});
userRouter.put('/:id', (req, res) => {res.send({title: 'UPDATE new user'})});
userRouter.delete('/:id', (req, res) => {res.send({title: 'DELETE the user'})});

export default userRouter;
