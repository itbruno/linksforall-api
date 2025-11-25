import { UsersCreateInput } from 'prisma/generated/models';
import { UsersRepository } from '../users-repository';
import { Role, Users } from 'prisma/generated/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public users: Users[] = [];

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
}
