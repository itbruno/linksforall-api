import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Get user profile test', () => {
  beforeEach(async () => {
    await prisma.users.deleteMany({});
  });

  it('should be able to get user info', async () => {
    const newUser = await request(app).post('/users').send({
      fullname: 'New user',
      email: 'userprofile01@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const authenticatedUser = await request(app).post('/auth').send({
      email: 'userprofile01@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const user = await request(app).get(`/users/${newUser.body.id}`).set({
      'authorization': `Bearer ${authenticatedUser.body.token}`
    });

    expect(user.body).toMatchObject({
      fullname: 'New user',
      email: 'userprofile01@linksforall.com'
    });

    expect(user.status).toEqual(200);
  });

  it('should not be able to get user info from non logged user', async () => {
    await request(app).post('/users').send({
      fullname: 'New user 01',
      email: 'newuser01@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const anotherUser = await request(app).post('/users').send({
      fullname: 'New user 02',
      email: 'newuser02@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const authenticatedUser = await request(app).post('/auth').send({
      email: 'newuser01@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const user = await request(app).get(`/users/${anotherUser.body.id}`).set({
      'authorization': `Bearer ${authenticatedUser.body.token}`
    });

    expect(user.status).toEqual(403);
  });
});
