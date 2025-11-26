import { InMemoryUsersRepository } from '@/repositories/in-memory/im-users-repository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/not-found-error';
import { GetUserProfileUseCase } from './get-user-profile';

describe('User profile use case', () => {
  it('should be able to get user info', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const getUserProfile = new GetUserProfileUseCase(inMemoryUserRepository);

    const newUser = await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456'
    });

    const { user } = await getUserProfile.execute({
      id: newUser.id
    });

    expect(user.id).toBeDefined();
  });

  it('should be able to get user info', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const getUserProfile = new GetUserProfileUseCase(inMemoryUserRepository);

    await expect(
      getUserProfile.execute({
        id: 'non-existent-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
