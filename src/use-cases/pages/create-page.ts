import { PagesRepository } from '@/repositories/pages-repository';
import { Pages } from 'prisma/generated/client';
import { PageSlugAlreadyExistsError } from '../errors/page-slug-already-exists-error';
import { ResourceNotFoundError } from '../errors/not-found-error';

interface CreatePageUseCaseRequest {
  userId: string,
  title: string,
  description: string,
  settings?: object,
  slug: string
}
interface CreatePageUseCaseResponse {
  page: Pages
}

export class CreatePageUseCase {
  constructor(private pagesRepository: PagesRepository) { }

  async execute(data: CreatePageUseCaseRequest): Promise<CreatePageUseCaseResponse> {
    if (!data.userId) {
      throw new ResourceNotFoundError('Missing user id');
    }
    const doesSlugAlreadyExists = await this.pagesRepository.findBySlug(data.slug);

    if (doesSlugAlreadyExists) {
      throw new PageSlugAlreadyExistsError();
    }

    const page = await this.pagesRepository.create(data);

    return { page };

  }
}
