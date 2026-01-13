import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Delete user test', () => {
  beforeEach(async () => {
    await prisma.users.deleteMany({});
  });

  it('should be able to delete an user', async () => {
    const newUser = await request(app).post('/users').send({
      fullname: 'New user',
      email: 'deleteuser@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const authenticatedUser = await request(app).post('/auth').send({
      email: 'deleteuser@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const deletedUserRequest = await request(app).delete(`/users/${newUser.body.id}`)
      .set({
        'authorization': `Bearer ${authenticatedUser.body.token}`
      });

    expect(deletedUserRequest.status).toEqual(204);
  });
});
