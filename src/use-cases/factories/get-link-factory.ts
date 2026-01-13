import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository';
import { GetLinkUseCase } from '../links/get-link';

export function getLinkUseCase() {
  const linkRepository = new PrismaLinksRepository();
  const linkUseCase = new GetLinkUseCase(linkRepository);

  return linkUseCase;
}
