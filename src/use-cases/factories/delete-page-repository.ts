import { PrismaPagesRepository } from '@/repositories/prisma/prisma-pages-repository';
import { DeletePageUseCase } from '../pages/delete-page';

export function deletePageUseCase() {
  const pageRepository = new PrismaPagesRepository();
  const pageUseCase = new DeletePageUseCase(pageRepository);

  return pageUseCase;
}
