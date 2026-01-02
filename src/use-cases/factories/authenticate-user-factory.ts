import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUserUseCase } from '../users/authenticate-user';

export function userAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUserUseCase(userRepository);

  return authenticateUseCase;
}
