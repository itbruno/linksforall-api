import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Create user test', () => {
  beforeEach(async () => {
    await prisma.users.deleteMany({});
  });

  it('should be able to create an user', async () => {
    const user = await request(app).post('/users').send({
      fullname: 'New user',
      email: 'createuser@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    expect(user.status).toEqual(201);
  });
});
