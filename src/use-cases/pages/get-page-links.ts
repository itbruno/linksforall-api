import { PagesRepository } from '@/repositories/pages-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

export class GetPageLinksUseCase {
  constructor(private pagesRepository: PagesRepository) { }

  async execute(pageId: string) {
    const page = await this.pagesRepository.findById(pageId);

    if (!page) {
      throw new ResourceNotFoundError('Page not found');
    }

    const links = await this.pagesRepository.findPageLinks(pageId);

    return { links };
  }
}
