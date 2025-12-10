import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { CreateLinkUseCase } from './create-link';
import { InMemoryLinksRepository } from '@/repositories/in-memory/im-links-repository';



describe('Create links use case', () => {

  it('should be able to create a new link', async () => {
    const inMemoryLinksRepository = new InMemoryLinksRepository();
    const createLinkUseCase = new CreateLinkUseCase(inMemoryLinksRepository);

    const { link } = await createLinkUseCase.execute({
      title: faker.lorem.words(5),
      description: faker.lorem.words(20),
      url: faker.internet.url(),
      pageId: 'page-001',
      type: 'url'
    });

    expect(link.id).toEqual(expect.any(String));
  });
});
