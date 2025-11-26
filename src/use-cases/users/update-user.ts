import { UsersRepository } from '@/repositories/users-repository';
import { encryptString } from '@/utils/encrypt-string';
import { Users } from 'prisma/generated/client';
import { UsersUpdateWithoutPageInput } from 'prisma/generated/models';
import { ResourceNotFoundError } from '../errors/not-found-error';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';

interface UpdateUserUseCaseRequest {
  id: string;
  data: UsersUpdateWithoutPageInput
}

interface UpdateUserUseCaseResponse {
  user: Users
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ id, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError('User doesn\'t exists');
    }

    if (data.email && data.email !== user.email) {
      const doesEmaiInUse = await this.usersRepository.findByEmail(data.email as string);
      if (doesEmaiInUse) throw new EmailAlreadyExistsError();
    }

    if (data.password) {
      data.password = await encryptString(data.password.toString());
    }

    const updatedUser = await this.usersRepository.update(id, data);

    return { user: updatedUser };
  }
}
