import { LinksRepository } from '@/repositories/links-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

interface UpdateLinkUseCaseRequest {
  id: string,
  data: {
    title?: string
    description?: string
    url?: string
    pageId?: string
    type?: string
  }
}

export class UpdateLinkUseCase {
  constructor(private linksRepository: LinksRepository) { }

  async execute({ id, data }: UpdateLinkUseCaseRequest) {
    const currentLink = await this.linksRepository.findById(id);

    if (!currentLink) {
      throw new ResourceNotFoundError('Link not found');
    }

    // Merge current data with updates
    const updatedData = {
      title: data.title ?? currentLink.title,
      description: data.description ?? currentLink.description,
      url: data.url ?? currentLink.url,
      pageId: data.pageId ?? currentLink.pageId,
      type: data.type ?? currentLink.type
    };

    const link = await this.linksRepository.update(id, updatedData);

    return { link };
  }
}
