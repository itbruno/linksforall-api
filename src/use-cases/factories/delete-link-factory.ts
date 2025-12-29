import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository';
import { DeleteLinkUseCase } from '../links/delete-link';

export function deleteLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const linkUseCase = new DeleteLinkUseCase(linksRepository);

  return linkUseCase;
}
