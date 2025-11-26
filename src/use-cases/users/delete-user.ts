import { UsersRepository } from '@/repositories/users-repository';

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw Error('User doesn\t exists');
    }

    return await this.usersRepository.delete(id);
  }
}
