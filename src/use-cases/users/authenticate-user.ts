import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

import { compare } from 'bcrypt';

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({ email, password }: AuthenticateUserUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
