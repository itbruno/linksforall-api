import { prisma } from '../services/prismaConnect';
import { User } from '@prisma/client';

export type UserOrderBy = 'desc' | 'asc';

class UserModel {
  async findAll(sort: UserOrderBy) {
    const users = await prisma.user.findMany({ orderBy: {
      id: sort
    } });

    return users;
  }

  async findById(id: User['id']) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
    });

    return user;
  }

  async findByEmail(email: User['email']) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  }

  async create({
    fullname,
    password,
    email,
    slug
  }: User) {
    const newUser = await prisma.user.create({
      data: {
        fullname,
        password,
        email,
        slug
      }
    });

    return newUser;
  }

  async update(userId: User['id'], userData: User) {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData
    });

    return updatedUser;
  }

  async delete(id: User['id']) {
    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    });

    return deletedUser;
  }
}

export default new UserModel();
