import { PrismaPagesRepository } from '@/repositories/prisma/prisma-pages-repository';
import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository';
import { CreateLinkUseCase } from '../links/create-link';

export function createLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const pagesRepository = new PrismaPagesRepository();
  const linkUseCase = new CreateLinkUseCase(linksRepository, pagesRepository);

  return linkUseCase;
}
