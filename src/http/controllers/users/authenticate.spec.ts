import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { encryptString } from '@/utils/encrypt-string';

describe('Authenticate E2E test', () => {
  it('should be able to authenticate', async () => {

    // TO-DO: Update to user creation controller
    await prisma.users.create({
      data: {
        fullname: 'Manager',
        email: 'manager+test@linksforall.com',
        password: await encryptString('123456')
      }
    });

    const response = await request(app).post('/auth').send({
      email: 'manager+test@linksforall.com',
      password: '123456'
    }).set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();
  });
});
