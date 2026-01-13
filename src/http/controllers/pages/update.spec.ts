import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Update page test', () => {
  beforeEach(async () => {
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to update a page', async () => {
    const userResponse = await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const user = userResponse.body;

    const page = await prisma.pages.create({
      data: {
        slug: 'old-slug',
        title: 'Old Title',
        description: 'Old description',
        userId: user.id
      }
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .put(`/pages/${page.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        slug: 'updated-slug',
        title: 'Updated Title',
        description: 'Updated description'
      });

    expect(response.status).toEqual(200);
    expect(response.body.slug).toEqual('updated-slug');
  });

  it('should return 409 when trying to update to an existing slug', async () => {
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

    const anotherUserResponse = await request(app).post('/users').send({
      fullname: 'Another User',
      email: 'anotheruser@linksforall.com',
      password: '123456'
    });

    const anotherUser = anotherUserResponse.body;

    const page = await prisma.pages.create({
      data: {
        slug: 'another-slug',
        title: 'Another Page',
        description: 'Another description',
        userId: anotherUser.id
      }
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .put(`/pages/${page.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        slug: 'existing-slug'
      });

    expect(response.status).toEqual(409);
  });
});
