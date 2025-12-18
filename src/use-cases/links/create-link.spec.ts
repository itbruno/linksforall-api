import { InMemoryLinksRepository } from '@/repositories/in-memory/im-links-repository';
import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/not-found-error';
import { CreateLinkUseCase } from './create-link';

describe('Create links use case', () => {

  it('should be able to create a new link', async () => {
    const inMemoryLinksRepository = new InMemoryLinksRepository();
    const inMemoryPagesRepository = new InMemoryPagesRepository();
    const createLinkUseCase = new CreateLinkUseCase(inMemoryLinksRepository, inMemoryPagesRepository);

    inMemoryPagesRepository.create({
      userId: 'user-001',
      id: 'page-001',
      title: 'TS Page',
      description: 'A simple page',
      slug: 'my-new-page',
    });

    const { link } = await createLinkUseCase.execute({
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      url: faker.internet.url(),
      pageId: 'page-001',
      type: 'url'
    });

    expect(link.id).toEqual(expect.any(String));
  });

  it('should not be able to create a new link from a non existent page', async () => {
    const inMemoryLinksRepository = new InMemoryLinksRepository();
    const inMemoryPagesRepository = new InMemoryPagesRepository();
    const createLinkUseCase = new CreateLinkUseCase(inMemoryLinksRepository, inMemoryPagesRepository);

    await expect(createLinkUseCase.execute({
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      url: faker.internet.url(),
      pageId: 'page-001',
      type: 'url'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
