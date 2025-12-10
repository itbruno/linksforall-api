import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { GetPageUseCase } from './get-page';
import { ResourceNotFoundError } from '../errors/not-found-error';


describe('Get page use case', () => {

  it('should be able to get a page by id', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const getPageUseCase = new GetPageUseCase(inMemoryPageRepository);

    await inMemoryPageRepository.create({
      id: 'new-page-id',
      userId: 'user-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: faker.lorem.slug()
    });

    const { page } = await getPageUseCase.execute('new-page-id');

    expect(page.id).toEqual('new-page-id');
    expect(page).not.null;
  });

  it('should not be able to get page with non-existent id', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const getPageUseCase = new GetPageUseCase(inMemoryPageRepository);

    expect(getPageUseCase.execute('non-created-page-id')).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
