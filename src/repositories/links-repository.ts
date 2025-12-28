import { Links } from 'prisma/generated/client';
import { LinksUncheckedCreateInput } from 'prisma/generated/models';

export interface LinksRepository {
  findById(id: string): Promise<Links|null>,
  create(data: LinksUncheckedCreateInput): Promise<Links>,
  update(id: string, data: LinksUncheckedCreateInput): Promise<Links>,
  delete(id: string): Promise<void>
}
