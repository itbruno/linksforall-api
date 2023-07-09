import { prisma } from '@/services/prismaConnect';
import { Prisma, Users } from '@prisma/client';

export type UserOrderBy = 'desc' | 'asc';

class UserModel {
  async findAll(sort: UserOrderBy) {
    const users = await prisma.users.findMany({ orderBy: {
      id: sort,
    }});

    return users;
  }

  async findById(id: Users['id']) {
    const user = await prisma.users.findUnique({
      where: {
        id: id
      },
      include: {
        page: true
      }
    });

    return user;
  }

  async findByEmail(email: Users['email']) {
    const user = await prisma.users.findUnique({
      where: {
        email: email
      }
    });

    return user;
  }

  async create({
    fullname,
    password,
    email
  }: Prisma.UsersUncheckedCreateInput) {
    const newUser = await prisma.users.create({
      data: {
        fullname: fullname,
        password,
        email
      }
    });

    return newUser;
  }

  async update(userId: Users['id'], {
    fullname,
    email,
    profile_photo,
    password
  }: Prisma.UsersUncheckedUpdateInput) {
    const updatedUser = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        fullname,
        email,
        profile_photo,
        password
      }
    });

    return updatedUser;
  }

  async delete(id: Users['id']) {
    const deletedUser = await prisma.users.delete({
      where: {
        id
      }
    });

    return deletedUser;
  }
}

export default new UserModel();
