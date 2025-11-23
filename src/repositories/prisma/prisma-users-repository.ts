import { UsersCreateInput } from 'prisma/generated/models';
import { UsersRepository } from '../user-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UsersCreateInput) {
    const user = await prisma.users.create({
      data
    });

    return user;
  }

  async findByEmail(email: string) {
    const userByEmail = await prisma.users.findUnique({
      where: {
        email
      }
    });

    if (userByEmail) {
      return userByEmail;
    }

    return null;
  }
}
