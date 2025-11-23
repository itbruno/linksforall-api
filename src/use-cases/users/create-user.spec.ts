import { InMemoryUsersRepository } from '@/repositories/in-memory/im-users-repository';
import { describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('Create User use case', () => {
  it('should be able to create a new user', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

    const { user } = await createUserUseCase.execute({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456'
    });

    expect(user.id).toBeDefined();
  });

  it('should not be able to create a new user with same email', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

    const userData = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456'
    };

    await createUserUseCase.execute(userData);

    await expect(
      createUserUseCase.execute(userData)
    ).rejects.toThrow();
  });
});
