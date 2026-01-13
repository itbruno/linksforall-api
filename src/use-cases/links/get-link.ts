import { LinksRepository } from '@/repositories/links-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

export class GetLinkUseCase {
  constructor(private linksRepository: LinksRepository) { }

  async execute(id: string) {
    const link = await this.linksRepository.findById(id);

    if (!link) {
      throw new ResourceNotFoundError('Link not found');
    }

    return { link };
  }
}
