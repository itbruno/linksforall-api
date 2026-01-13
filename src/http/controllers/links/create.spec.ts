import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Create link test', () => {
  beforeEach(async () => {
    await prisma.links.deleteMany({});
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to create a link', async () => {
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

    const response = await request(app)
      .post('/links')
      .send({
        title: 'New Link',
        description: 'Link Description',
        url: 'https://example.com',
        type: 'link',
        pageId: page.id
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toEqual('New Link');
  });

  it('should return 404 when page does not exist', async () => {
    const response = await request(app)
      .post('/links')
      .send({
        title: 'New Link',
        description: 'Link Description',
        url: 'https://example.com',
        type: 'link',
        pageId: '00000000-0000-0000-0000-000000000000'
      });

    expect(response.status).toEqual(404);
  });
});
