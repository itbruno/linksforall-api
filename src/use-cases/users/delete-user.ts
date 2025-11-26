import { UsersRepository } from '@/repositories/users-repository';
import {ResourceNotFoundError } from '../errors/not-found-error';

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError('User doesn\'t exists');
    }

    return await this.usersRepository.delete(id);
  }
}
