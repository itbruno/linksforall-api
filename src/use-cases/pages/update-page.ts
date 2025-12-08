import { PagesRepository } from '@/repositories/pages-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';
import { PageSlugAlreadyExistsError } from '../errors/page-slug-already-exists-error';

interface UpdatePageUseCaseRequest {
  id: string,
  slug?: string,
  title?: string,
  description?: string,
  settings?: {
    [key: string]: string
  }
}

export class UpdatePageUseCase {
  constructor(private pagesRepository: PagesRepository) { }

  async execute(data: UpdatePageUseCaseRequest) {
    const pageExists = this.pagesRepository.findById(data.id);

    if (!pageExists) {
      throw new ResourceNotFoundError('Page not found');
    }

    if (data.slug) {
      const slugAlreadyExists = await this.pagesRepository.findBySlug(data.slug);
      if(slugAlreadyExists) throw new PageSlugAlreadyExistsError();
    }

    const updatedPage = await this.pagesRepository.update(data);

    return {
      page: updatedPage
    };
  }
}
