import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { CreatePageUseCase } from './create-page';
import { InMemoryPagesRepository } from '@/repositories/in-memory/im-pages-respository';
import { PageSlugAlreadyExists } from '../errors/page-slug-already-exists-error';


describe('Create Pages use case', () => {

  it('should be able to create a new page', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const createPageUseCase = new CreatePageUseCase(inMemoryPageRepository);

    const { page } = await createPageUseCase.execute({
      userId: 'user-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: faker.lorem.slug()
    });

    expect(page.id).toEqual(expect.any(String));
  });

  it('should bit be able to create a new page with existing slug', async () => {
    const inMemoryPageRepository = new InMemoryPagesRepository();
    const createPageUseCase = new CreatePageUseCase(inMemoryPageRepository);

    await createPageUseCase.execute({
      userId: 'user-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: 'my-new-page'
    });

    await expect(createPageUseCase.execute({
      userId: 'user-001',
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      slug: 'my-new-page'
    })).rejects.toBeInstanceOf(PageSlugAlreadyExists);
  });
});
