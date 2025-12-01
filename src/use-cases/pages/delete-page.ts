import { PagesRepository } from '@/repositories/pages-repository';
import { ResourceNotFoundError } from '../errors/not-found-error';

export class DeletePageUseCase {
  constructor(private pageRepository: PagesRepository) { }

  async execute(id: string) {
    const page = await this.pageRepository.findById(id);

    if (!page) {
      throw new ResourceNotFoundError();
    }

    await this.pageRepository.delete(id);
  }
}
