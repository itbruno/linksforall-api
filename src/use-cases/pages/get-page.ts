import { PagesRepository } from '@/repositories/pages-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

export class GetPageUseCase {
  constructor(private pagesRepository: PagesRepository) { }

  async execute(id: string) {
    const page = await this.pagesRepository.findById(id);

    if (!page) {
      throw new ResourceNotFoundError('Page not found');
    }

    return { page };
  }
}
