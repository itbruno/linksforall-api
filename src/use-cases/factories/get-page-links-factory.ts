import { PrismaPagesRepository } from '@/repositories/prisma/prisma-pages-repository';
import { GetPageLinksUseCase } from '../pages/get-page-links';

export function getPageLinksUseCase() {
  const pageRepository = new PrismaPagesRepository();
  const pageUseCase = new GetPageLinksUseCase(pageRepository);

  return pageUseCase;
}
