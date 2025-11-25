import { UsersCreateInput } from 'prisma/generated/models';
import { UsersRepository } from '../users-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UsersCreateInput) {
    const user = await prisma.users.create({
      data
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (user) {
      return user;
    }

    return null;
  }

  async findById(id: string){
    const user = await prisma.users.findUnique({
      where: { id }
    });

    if (user) {
      return user;
    }

    return null;
  }
}
