import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Get link test', () => {
  beforeEach(async () => {
    await prisma.links.deleteMany({});
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to get a link by id', async () => {
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

    const link = await prisma.links.create({
      data: {
        title: 'Test Link',
        description: 'Test Description',
        url: 'https://example.com',
        type: 'link',
        pageId: page.id
      }
    });

    const response = await request(app).get(`/links/${link.id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toEqual('Test Link');
  });

  it('should return 404 when link does not exist', async () => {
    const response = await request(app).get('/links/00000000-0000-0000-0000-000000000000');

    expect(response.status).toEqual(404);
  });
});
