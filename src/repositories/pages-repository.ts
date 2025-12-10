import { Pages } from 'prisma/generated/client';
import { PagesUncheckedCreateInput, PagesUncheckedUpdateInput } from 'prisma/generated/models';

export interface PagesRepository {
  create(data: PagesUncheckedCreateInput): Promise<Pages>
  findBySlug(slug: string): Promise<Pages|null>
  findById(id: string): Promise<Pages|null>
  delete(id: string): Promise<void>
  update(data: PagesUncheckedUpdateInput): Promise<Pages>
}
