import { Router } from 'express';
import UserController from './controllers/UserController';
import PageController from './controllers/PageController';
import LinkController from './controllers/LinkController';
import AuthController from './controllers/AuthController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();

// User routes
router.post('/users', UserController.store);
router.get('/users', authMiddleware, UserController.index);
router.get('/users/:id', authMiddleware, UserController.show);
router.put('/users/:id', authMiddleware, UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);

// Pages routes
router.post('/pages', authMiddleware, PageController.store);
router.get('/pages/:id', authMiddleware, PageController.show);
router.put('/pages/:id', authMiddleware, PageController.update);
router.get('/pages/:id/links', authMiddleware, PageController.links);

// Links routes
router.get('/links/:id', LinkController.show);
router.post('/links', LinkController.store);
router.put('/links/:id', LinkController.update);
router.delete('/links/:id', LinkController.delete);

// Auth
router.post('/auth', AuthController.authenticate);

export default router;
