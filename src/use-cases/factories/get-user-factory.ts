import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserProfileUseCase } from '../users/get-user-profile';

export function getUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository();
  const userUseCase = new GetUserProfileUseCase(userRepository);

  return userUseCase;
}
