import { PrismaPagesRepository } from '@/repositories/prisma/prisma-pages-repository';
import { GetPageUseCase } from '../pages/get-page';

export function getPageUseCase() {
  const pageRepository = new PrismaPagesRepository();
  const pageUseCase = new GetPageUseCase(pageRepository);

  return pageUseCase;
}
