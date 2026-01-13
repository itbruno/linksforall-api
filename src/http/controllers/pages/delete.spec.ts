import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Delete page test', () => {
  beforeEach(async () => {
    await prisma.pages.deleteMany({});
    await prisma.users.deleteMany({});
  });

  it('should be able to delete a page', async () => {
    const userResponse = await request(app).post('/users').send({
      fullname: 'Test User',
      email: 'testuser@linksforall.com',
      password: '123456'
    });

    const user = userResponse.body;

    const page = await prisma.pages.create({
      data: {
        slug: 'page-to-delete',
        title: 'Page to Delete',
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
      .delete(`/pages/${page.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(204);

    const deletedPage = await prisma.pages.findUnique({
      where: { id: page.id }
    });

    expect(deletedPage).toBeNull();
  });

  it('should return 404 when trying to delete non-existent page', async () => {
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
      .delete('/pages/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });
});
