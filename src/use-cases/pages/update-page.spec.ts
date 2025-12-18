import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';
import { PageSlugAlreadyExistsError } from '../errors/page-slug-already-exists-error';
import { UpdatePageUseCase } from './update-page';


describe('Update pages use case', () => {

  it('should be able to update a page', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const updatePageUseCase = new UpdatePageUseCase(inMemoryPageRepository);

    const newPage = await inMemoryPageRepository.create({
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: faker.lorem.slug(),
      userId: 'user-001',
    });

    const {page} = await updatePageUseCase.execute({
      id: newPage.id,
      title: 'Bio page',
      description: 'Page for my social media'
    });

    expect(page.title).toEqual('Bio page');
    expect(page.description).toEqual('Page for my social media');
  });

  it('should not be able to update slug with existing slug page', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const updatePageUseCase = new UpdatePageUseCase(inMemoryPageRepository);

    const newPage = await inMemoryPageRepository.create({
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: 'bio-page-slug',
      userId: 'user-001',
    });

    expect(updatePageUseCase.execute({
      id: newPage.id,
      title: 'Bio page',
      description: 'Page for my social media',
      slug: 'bio-page-slug'
    })).rejects.toBeInstanceOf(PageSlugAlreadyExistsError);
  });
});
