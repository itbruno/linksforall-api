import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

// User Routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

export default router;
