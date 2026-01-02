import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Update user test', () => {
  beforeEach(async () => {
    await prisma.users.deleteMany({});
  });

  it('should be able to update an user', async () => {
    const newUser = await request(app).post('/users').send({
      fullname: 'New user',
      email: 'newuser123@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const authenticatedUser = await request(app).post('/auth').send({
      email: 'newuser123@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const updateUser = await request(app).patch(`/users/${newUser.body.id}`)
      .send({
        email: 'newemail@linksforall.com'
      }).set({
        'authorization': `Bearer ${authenticatedUser.body.token}`
      });

    expect(updateUser.body.email).toEqual('newemail@linksforall.com');
  });
});
