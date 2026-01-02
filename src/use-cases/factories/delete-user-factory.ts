import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { DeleteUserUseCase } from '../users/delete-user';

export function deleteUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const userUseCase = new DeleteUserUseCase(userRepository);

  return userUseCase;
}
