import { InMemoryLinksRepository } from '@/repositories/in-memory/im-links-repository';
import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteLinkUseCase } from './delete-link';
import { ResourceNotFoundError } from '../errors/not-found-error';

describe('Delete links use case', () => {
  let inMemoryLinksRepository: InMemoryLinksRepository;
  let deleteLinkUseCase: DeleteLinkUseCase;

  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository();
    deleteLinkUseCase = new DeleteLinkUseCase(inMemoryLinksRepository);
  });

  it('should be able to delete a link', async () => {
    const inMemoryPagesRepository = new InMemoryPagesRepository();

    await inMemoryPagesRepository.create({
      id: 'page-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(10),
      slug: faker.lorem.slug(),
      userId: randomUUID()
    });

    const link = await inMemoryLinksRepository.create({
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      url: faker.internet.url(),
      pageId: 'page-001',
      type: 'url'
    });

    await expect(deleteLinkUseCase.execute(link.id)).resolves.toBeUndefined();
  });

  it('should throw error when trying to delete non-existent link', async () => {
    await expect(() =>
      deleteLinkUseCase.execute('non-existent-id')
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
