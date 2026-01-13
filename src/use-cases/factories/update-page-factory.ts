import { PrismaPagesRepository } from '@/repositories/prisma/prisma-pages-repository';
import { UpdatePageUseCase } from '../pages/update-page';

export function updatePageUseCase() {
  const pageRepository = new PrismaPagesRepository();
  const pageUseCase = new UpdatePageUseCase(pageRepository);

  return pageUseCase;
}
