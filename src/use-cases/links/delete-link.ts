import { LinksRepository } from '@/repositories/links-repository';

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(id: string) {
    await this.linksRepository.delete(id);
  }
}
