import { Router } from 'express';
import UserController from '@/http/controllers/users-controller';
import PageController from '@/http/controllers/pages-controller';
import LinkController from '@/http/controllers/links-controller';
import AuthController from '@/http/controllers/auth-controller';
import { authMiddleware } from '@/middlewares/auth-middleware';
import { checkUserRoleMiddleware } from '@/middlewares/check-user-role-middleware';
import { authenticateUserController } from './controllers/users/authenticate';

const router = Router();

// User routes
router.post('/users', UserController.store);
router.get('/users', [authMiddleware, checkUserRoleMiddleware('ADMIN')], UserController.index);
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
router.post('/auth', authenticateUserController);

export default router;
