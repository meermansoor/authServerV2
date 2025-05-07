import { Router } from 'express';
import { authorize } from '../middleware/auth.middleware.js';
import { createSubscritpion, getUserSubcription, getAllSubscriptions} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions);

subscriptionRouter.get('/:id', (req, res) => { res.send({ title: 'GET subscriptions details' }) });

subscriptionRouter.post('/',authorize,createSubscritpion);

subscriptionRouter.put('/', (req, res) => { res.send({ title: 'Update subscriptions' }) });

subscriptionRouter.delete('/', (req, res) => { res.send({ title: 'DELETE subscriptions' }) });

subscriptionRouter.get('/user/:id' ,authorize,getUserSubcription);

subscriptionRouter.put('/:id/cancel', (req, res) => { res.send({ title: 'CANCEL user subscriptions' }) });

subscriptionRouter.get('/upcoming-renewals', (req, res) => { res.send({ title: 'GET upcoming renewals' }) });

export default subscriptionRouter;
