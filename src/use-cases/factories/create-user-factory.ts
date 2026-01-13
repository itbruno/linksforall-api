import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../users/create-user';

export function createUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const userUseCase = new CreateUserUseCase(userRepository);

  return userUseCase;
}
