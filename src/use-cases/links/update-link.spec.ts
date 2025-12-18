import { InMemoryLinksRepository } from '@/repositories/in-memory/im-links-repository';
import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { UpdateLinkUseCase } from './update-link';
import { ResourceNotFoundError } from '../errors/not-found-error';

describe('Update links use case', () => {

  it('should be able to update a link', async () => {
    const inMemoryLinksRepository = new InMemoryLinksRepository();
    const inMemoryPagesRepository = new InMemoryPagesRepository();
    const updateLinkUseCase = new UpdateLinkUseCase(inMemoryLinksRepository);

    await inMemoryPagesRepository.create({
      id: 'page-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(10),
      slug: faker.lorem.slug(),
      userId: randomUUID()
    });

    const newLink = await inMemoryLinksRepository.create({
      id: 'link-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      url: faker.internet.url(),
      pageId: 'page-001',
      type: 'url'
    });

    const {link} = await updateLinkUseCase.execute({
      id: newLink.id,
      data: {
        title: 'Linksforall',
        description: 'Links page for your business',
        url: 'https://linksforall.dev',
        pageId: 'page-001',
        type: 'url'
      }
    });

    expect(link.title).toEqual('Linksforall');
  });

  it('should not be able to update a link with inexistent id', async () => {
    const inMemoryLinksRepository = new InMemoryLinksRepository();
    const updateLinkUseCase = new UpdateLinkUseCase(inMemoryLinksRepository);

    await expect(updateLinkUseCase.execute({
      id: 'wrong-id',
      data: {
        title: 'Linksforall',
        description: 'Links page for your business',
        url: 'https://linksforall.dev',
        pageId: 'page-001',
        type: 'url'
      }
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
