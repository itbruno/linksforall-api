import { Users } from 'prisma/generated/client';
import { UsersCreateInput, UsersUpdateInput } from 'prisma/generated/models';

export interface UsersRepository {
  create(data: UsersCreateInput): Promise<Users>
  update(id: string, data: UsersUpdateInput): Promise<Users>
  findByEmail(email: string): Promise<Users|null>
  findById(id: string): Promise<Users|null>
  delete(id: string): Promise<void>
}
