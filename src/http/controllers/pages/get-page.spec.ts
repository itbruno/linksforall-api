import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Get page test', () => {
  beforeEach(async () => {
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to get a page by id', async () => {
    const userResponse = await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const user = userResponse.body;

    const page = await prisma.pages.create({
      data: {
        slug: 'test-page',
        title: 'Test Page',
        description: 'Test description',
        userId: user.id
      }
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get(`/pages/${page.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.slug).toEqual('test-page');
  });

  it('should return 404 when page does not exist', async () => {
    await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get('/pages/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });
});
