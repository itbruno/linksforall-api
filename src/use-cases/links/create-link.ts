import { LinksRepository } from '@/repositories/links-repository';
import { PagesRepository } from '@/repositories/pages-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

interface CreateLinkUseCaseRequest {
  title: string
  description: string
  url: string
  pageId: string
  type: string
}

export class CreateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private pagesRepository: PagesRepository
  ) { }

  async execute(data: CreateLinkUseCaseRequest) {
    const doesPageExists = await this.pagesRepository.findById(data.pageId);

    if (!doesPageExists) {
      throw new ResourceNotFoundError('Page not found');
    }

    const link = await this.linksRepository.create(data);

    return { link };
  }
}
