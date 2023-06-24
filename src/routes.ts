import { Router } from 'express';
import { prisma } from './services/prismaConnect';

const router = Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();

  res.send({
    users: users
  }).status(200);
});
router.get('/user', (req, res) => res.send({ 'path': '/user'}).status(200));
router.get('/links', (req, res) => res.send({ 'path': '/links'}).status(200));


export default router;
