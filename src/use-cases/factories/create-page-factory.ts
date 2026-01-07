import { PrismaPagesRepository } from '@/repositories/prisma/prisma-pages-repository';
import { CreatePageUseCase } from '../pages/create-page';

export function createPageUseCase() {
  const pageRepository = new PrismaPagesRepository();
  const pageUseCase = new CreatePageUseCase(pageRepository);

  return pageUseCase;
}
