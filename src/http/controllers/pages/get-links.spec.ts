import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Get page links test', () => {
  beforeEach(async () => {
    await prisma.links.deleteMany({});
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to get links from a page', async () => {
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

    await prisma.links.create({
      data: {
        title: 'Link 1',
        description: 'Description 1',
        url: 'https://example.com/1',
        type: 'link',
        pageId: page.id
      }
    });

    await prisma.links.create({
      data: {
        title: 'Link 2',
        description: 'Description 2',
        url: 'https://example.com/2',
        type: 'link',
        pageId: page.id
      }
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get(`/pages/${page.id}/links`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('url');
  });

  it('should return empty array when page has no links', async () => {
    const userResponse = await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const user = userResponse.body;

    const page = await prisma.pages.create({
      data: {
        slug: 'empty-page',
        title: 'Empty Page',
        description: 'Page with no links',
        userId: user.id
      }
    });

    const authResponse = await request(app).post('/auth').send({
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get(`/pages/${page.id}/links`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(0);
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
      .get('/pages/00000000-0000-0000-0000-000000000000/links')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });
});
