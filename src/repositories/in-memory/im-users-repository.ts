import { UsersCreateInput, UsersUncheckedUpdateWithoutPageInput, UsersUpdateInput } from 'prisma/generated/models';
import { UsersRepository } from '../users-repository';
import { Role, Users } from 'prisma/generated/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
  private users: Users[] = [];

  async create(data: UsersCreateInput) {
    const user = {
      id: randomUUID(),
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      profile_photo: null,
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: null
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email) || null;
    return user;
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id) || null;
    return user;
  }

  async update(id: string, data: UsersUpdateInput) {
    const updatedUser: UsersUpdateInput = {
      id,
      fullname: data.fullname,
      password: data.password,
      profile_photo: data.profile_photo,
      role: data.role,
      createdAt: data.createdAt,
      email: data.email,
      updatedAt: new Date().toISOString()
    };

    this.users = this.users.map(user => user.id === id ? updatedUser : user) as Users[];
    const user = this.users.find(user => user.id === id);

    return user as Users;
  }

  async delete(id: string) {
    const listWithDeletedUser = this.users.filter(user => user.id !== id);

    this.users = listWithDeletedUser;
  }
}
