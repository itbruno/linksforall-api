import { compare } from 'bcrypt';
import { describe, expect, it} from 'vitest';
import { UpdateUserUseCase } from './update-user';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InMemoryUsersRepository } from '@/repositories/in-memory/im-users-repository';

describe('Update User use case', () => {
  it('should be able to update name and email', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    const newUser = await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const newEmailToUpdate = faker.internet.email();

    const { user } = await updateUserUseCase.execute({
      id: newUser.id,
      data: {
        fullname: 'John Doe',
        email: newEmailToUpdate
      }
    });

    expect(user.fullname).toEqual('John Doe');
    expect(user.email).toEqual(newEmailToUpdate);
  });

  it('should be able to update password', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    const newUser = await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const { user } = await updateUserUseCase.execute({
      id: newUser.id,
      data: {
        password: 'newpassword'
      }
    });

    const doesNewPasswordHashed = await compare('newpassword', user.password);
    expect(doesNewPasswordHashed).toBeTruthy();
  });

  it('should be able to update email from another existing user email', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    const existingEmail = faker.internet.email();

    await inMemoryUserRepository.create({
      fullname: faker.person.fullName(),
      email: existingEmail,
      password: faker.internet.password()
    });

    const newUser = await inMemoryUserRepository.create({
      fullname: 'Bruno Rodrigues',
      email: faker.internet.email(),
      password: '123456'
    });

    await expect(updateUserUseCase.execute({
      id: newUser.id,
      data: {
        email: existingEmail
      }
    })).rejects.toThrow('Invalid e-mail');
  });
});
