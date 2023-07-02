import { Router } from 'express';
import UserController from './controllers/UserController';
import PageController from './controllers/PageController';

const router = Router();

// User Routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.get('/pages/:id', PageController.show);
router.post('/pages', PageController.store);
router.put('/pages/:id', PageController.update);

export default router;
