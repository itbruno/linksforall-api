import { describe, expect, it } from 'vitest';
import { AuthenticateUserUseCase } from './authenticate-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/im-users-repository';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { encryptString } from '@/utils/encrypt-string';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

describe('Authenticate use case', () => {
  it('Should be able to authenticate', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);

    await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: 'johndoe@gmail.com',
      password: await encryptString('123456')
    });

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    expect(user).toBeDefined();
    expect(user.email).toEqual('johndoe@gmail.com');
  });

  it('Should not be able to authenticate with invalid email', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);

    await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: 'johndoe@gmail.com',
      password: await encryptString('123456')
    });

    await expect(authenticateUseCase.execute({
      email: 'maryjane@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('Should not be able to authenticate with invalid password', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);

    await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: 'johndoe@gmail.com',
      password: await encryptString('123456')
    });

    await expect(authenticateUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '12345699'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
