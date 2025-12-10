import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/not-found-error';
import { DeletePageUseCase } from './delete-page';


describe('Delete page use case', () => {

  it('should be able to delete page', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const deletePageUseCase = new DeletePageUseCase(inMemoryPageRepository);

    await inMemoryPageRepository.create({
      id: 'new-page-id',
      userId: 'user-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: faker.lorem.slug()
    });

    await expect(deletePageUseCase.execute('new-page-id')).resolves.toBeUndefined();
  });

  it('should not be able to delete page with non-existent id', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const deletePageUseCase = new DeletePageUseCase(inMemoryPageRepository);

    expect(deletePageUseCase.execute('non-created-page-id')).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
