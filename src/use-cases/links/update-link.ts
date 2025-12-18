import { LinksRepository } from '@/repositories/links-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

interface UpdateLinkUseCaseRequest {
  id: string,
  data: {
    title: string
    description: string
    url: string
    pageId: string
    type: string
  }
}

export class UpdateLinkUseCase {
  constructor(private linksRepository: LinksRepository) { }

  async execute({ id, data }: UpdateLinkUseCaseRequest) {
    const doesLinkExists = await this.linksRepository.findById(id);

    if (!doesLinkExists) {
      throw new ResourceNotFoundError('Link not found');
    }

    const link = await this.linksRepository.update(id, data);

    return { link };
  }
}
