import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Authenticate E2E test', () => {
  beforeEach(async () => {
    await prisma.users.deleteMany();
  });

  it('should be able to authenticate', async () => {

    await request(app).post('/users').send({
      fullname: 'Manager',
      email: 'manager+test@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    const response = await request(app).post('/auth').send({
      email: 'manager+test@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();
  });
});
