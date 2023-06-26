import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);

export default router;
