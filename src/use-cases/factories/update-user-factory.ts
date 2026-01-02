import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateUserUseCase } from '../users/update-user';

export function updateUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const userUseCase = new UpdateUserUseCase(userRepository);

  return userUseCase;
}
