import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Delete link test', () => {
  beforeEach(async () => {
    await prisma.links.deleteMany({});
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to delete a link', async () => {
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
        title: 'Link to Delete',
        description: 'Test Description',
        url: 'https://example.com',
        type: 'link',
        pageId: page.id
      }
    });

    const response = await request(app).delete(`/links/${link.id}`);

    expect(response.status).toEqual(204);

    const deletedLink = await prisma.links.findUnique({
      where: { id: link.id }
    });

    expect(deletedLink).toBeNull();
  });

  it('should return 404 when trying to delete non-existent link', async () => {
    const response = await request(app).delete('/links/00000000-0000-0000-0000-000000000000');

    expect(response.status).toEqual(404);
  });
});
