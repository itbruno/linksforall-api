import { Users } from 'prisma/generated/client';
import { UsersCreateInput } from 'prisma/generated/models';

export interface UsersRepository {
  create(data: UsersCreateInput): Promise<Users>
  findByEmail(email: string): Promise<Users|null>
  findById(id: string): Promise<Users|null>
}
