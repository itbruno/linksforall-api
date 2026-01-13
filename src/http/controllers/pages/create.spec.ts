import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Create page test', () => {
  beforeEach(async () => {
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to create a page', async () => {
    const userResponse = await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const user = userResponse.body;

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/pages')
      .set('Authorization', `Bearer ${token}`)
      .send({
        slug: 'new-page',
        title: 'New Page',
        description: 'Test description',
        userId: user.id
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.slug).toEqual('new-page');
  });

  it('should return 409 when slug already exists', async () => {
    const userResponse = await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const user = userResponse.body;

    await prisma.pages.create({
      data: {
        slug: 'existing-slug',
        title: 'Existing Page',
        description: 'Existing description',
        userId: user.id
      }
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/pages')
      .set('Authorization', `Bearer ${token}`)
      .send({
        slug: 'existing-slug',
        title: 'Another Page',
        description: 'Test description',
        userId: user.id
      });

    expect(response.status).toEqual(409);
  });
});
