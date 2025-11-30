import { Pages } from 'prisma/generated/client';
import { PagesUncheckedCreateInput } from 'prisma/generated/models';

export interface PagesRepository {
  findBySlug(slug: string): Promise<Pages|null>
  create(data: PagesUncheckedCreateInput): Promise<Pages>
}
