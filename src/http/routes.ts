import LinkController from '@/http/controllers/links-controller';
import { authMiddleware } from '@/middlewares/auth-middleware';
import { Router } from 'express';
import { authenticateUserController } from './controllers/users/authenticate';
import { createUserController } from './controllers/users/create';
import { deleteUserController } from './controllers/users/delete';
import { getUserProfileController } from './controllers/users/profile';
import { updateUserController } from './controllers/users/update';
import { createPageController } from './controllers/pages/create';
import { getPageController } from './controllers/pages/get-page';
import { updatePageController } from './controllers/pages/update';
import { deletePageController } from './controllers/pages/delete';
import { getPageLinksController } from './controllers/pages/get-links';

const router = Router();

// User routes
router.post('/users', createUserController);
router.patch('/users/:id', authMiddleware, updateUserController);
router.delete('/users/:id', authMiddleware, deleteUserController);
router.get('/users/:id', authMiddleware, getUserProfileController);

// Pages routes
router.post('/pages', authMiddleware, createPageController);
router.get('/pages/:id', authMiddleware, getPageController);
router.get('/pages/:id/links', authMiddleware, getPageLinksController);
router.put('/pages/:id', authMiddleware, updatePageController);
router.delete('/pages/:id', authMiddleware, deletePageController);

// Links routes
router.get('/links/:id', LinkController.show);
router.post('/links', LinkController.store);
router.put('/links/:id', LinkController.update);
router.delete('/links/:id', LinkController.delete);

// Auth
router.post('/auth', authenticateUserController);

export default router;
