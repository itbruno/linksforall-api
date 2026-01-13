import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Update link test', () => {
  beforeEach(async () => {
    await prisma.links.deleteMany({});
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to update a link', async () => {
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
        title: 'Old Title',
        description: 'Old Description',
        url: 'https://old-url.com',
        type: 'link',
        pageId: page.id
      }
    });

    const response = await request(app)
      .put(`/links/${link.id}`)
      .send({
        title: 'Updated Title',
        description: 'Updated Description',
        url: 'https://new-url.com'
      });

    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Updated Title');
    expect(response.body.url).toEqual('https://new-url.com');
  });

  it('should return 404 when trying to update non-existent link', async () => {
    const response = await request(app)
      .put('/links/00000000-0000-0000-0000-000000000000')
      .send({
        title: 'Updated Title'
      });

    expect(response.status).toEqual(404);
  });
});
