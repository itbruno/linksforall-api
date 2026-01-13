import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryLinksRepository } from '@/repositories/in-memory/im-links-repository';
import { GetLinkUseCase } from './get-link';
import { ResourceNotFoundError } from '../errors/not-found-error';

describe('Get Link Use Case', () => {
  let linksRepository: InMemoryLinksRepository;
  let sut: GetLinkUseCase;

  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository();
    sut = new GetLinkUseCase(linksRepository);
  });

  it('should be able to get a link by id', async () => {
    const createdLink = await linksRepository.create({
      title: 'Test Link',
      description: 'Test Description',
      url: 'https://example.com',
      type: 'link',
      pageId: 'page-01'
    });

    const { link } = await sut.execute(createdLink.id);

    expect(link.id).toEqual(createdLink.id);
    expect(link.title).toEqual('Test Link');
  });

  it('should throw error when link does not exist', async () => {
    await expect(() =>
      sut.execute('non-existent-link-id')
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
