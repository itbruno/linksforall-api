import { UsersRepository } from '@/repositories/users-repository';
import { encryptString } from '@/utils/encrypt-string';
import { Users } from 'prisma/generated/client';

interface CreateUserUseCaseRequest {
  fullname: string;
  email: string;
  password: string
}

interface CreateUserUseCaseResponse {
  user: Users
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(data: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const doesUserAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (doesUserAlreadyExists) {
      throw new Error('E-mail already exists');
    }

    const hashPassword = await encryptString(data.password);

    const user = await this.usersRepository.create({
      fullname: data.fullname,
      email: data.email,
      password: hashPassword
    });

    return { user };
  }
}
