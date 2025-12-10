import { LinksRepository } from '@/repositories/links-repository';

interface CreateLinkUseCaseRequest {
  title: string
  description: string
  url: string
  pageId: string
  type: string
}

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) { }

  async execute(data: CreateLinkUseCaseRequest) {
    const link = await this.linksRepository.create(data);

    return { link };
  }
}
