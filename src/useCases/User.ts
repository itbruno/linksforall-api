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

  async findByEmail({email}: User) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  }

  async create(userData: User) {
    const newUser = await prisma.user.create({
      data: userData
    });

    return newUser;
  }

  async update(userData: User) {
    const updatedUser = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: userData
    });

    return updatedUser;
  }

  async delete({id}: User) {
    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    });

    return deletedUser;
  }
}

export default new UserModel();
