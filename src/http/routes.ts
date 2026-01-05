import { Router } from 'express';
import UserController from '@/http/controllers/users-controller';
import PageController from '@/http/controllers/pages-controller';
import LinkController from '@/http/controllers/links-controller';
import { authMiddleware } from '@/middlewares/auth-middleware';
import { checkUserRoleMiddleware } from '@/middlewares/check-user-role-middleware';
import { authenticateUserController } from './controllers/users/authenticate';
import { createUserController } from './controllers/users/create';
import { updateUserController } from './controllers/users/update';
import { deleteUserController } from './controllers/users/delete';
import { getUserProfileController } from './controllers/users/profile';

const router = Router();

// User routes
router.post('/users', createUserController);
router.patch('/users/:id', authMiddleware, updateUserController);
router.delete('/users/:id', authMiddleware, deleteUserController);
router.get('/users/:id', authMiddleware, getUserProfileController);

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
