import { UsersRepository } from '@/repositories/users-repository';
import { Users } from 'prisma/generated/client';

interface GetUserProfileUseCaseRequest {
  id: string
}

interface GetUserProfileUseCaseResponse {
  user: Users
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({id}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw Error('User doesn\'t exists');
    }

    return { user };
  }
}
