import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { GetPageLinksUseCase } from './get-page-links';
import { ResourceNotFoundError } from '../errors/not-found-error';

describe('Get Page Links Use Case', () => {
  let pagesRepository: InMemoryPagesRepository;
  let sut: GetPageLinksUseCase;

  beforeEach(() => {
    pagesRepository = new InMemoryPagesRepository();
    sut = new GetPageLinksUseCase(pagesRepository);
  });

  it('should be able to get links from a page', async () => {
    const page = await pagesRepository.create({
      slug: 'test-page',
      title: 'Test Page',
      description: 'Test description',
      userId: 'user-01'
    });

    // Add some links to the in-memory repository
    pagesRepository.links.push({
      id: 'link-01',
      title: 'Link 1',
      description: 'Description 1',
      url: 'https://example.com/1',
      type: 'link',
      pageId: page.id,
      createdAt: new Date()
    });

    pagesRepository.links.push({
      id: 'link-02',
      title: 'Link 2',
      description: 'Description 2',
      url: 'https://example.com/2',
      type: 'link',
      pageId: page.id,
      createdAt: new Date()
    });

    const { links } = await sut.execute(page.id);

    expect(links).toHaveLength(2);
    expect(links[0].title).toEqual('Link 1');
    expect(links[1].title).toEqual('Link 2');
  });

  it('should return empty array when page has no links', async () => {
    const page = await pagesRepository.create({
      slug: 'empty-page',
      title: 'Empty Page',
      description: 'Page with no links',
      userId: 'user-01'
    });

    const { links } = await sut.execute(page.id);

    expect(links).toHaveLength(0);
  });

  it('should throw error when page does not exist', async () => {
    await expect(() =>
      sut.execute('non-existent-page-id')
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
