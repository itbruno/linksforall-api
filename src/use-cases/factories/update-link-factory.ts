import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository';
import { UpdateLinkUseCase } from '../links/update-link';

export function updateLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const linkUseCase = new UpdateLinkUseCase(linksRepository);

  return linkUseCase;
}
