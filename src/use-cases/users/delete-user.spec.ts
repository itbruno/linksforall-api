import { InMemoryUsersRepository } from '@/repositories/in-memory/im-users-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { encryptString } from '@/utils/encrypt-string';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';
import { DeleteUserUseCase } from './delete-user';

describe('Delete user Use Case', () => {
  it('Should be able to delete an user', async() => {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    const user = await usersRepository.create({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: await encryptString(faker.internet.password().toString())
    });

    await expect(deleteUserUseCase.execute(user.id)).resolves.toBeUndefined();
  });

  it('Should no be able to delete a non existing user', async() => {
    const usersRepository = new InMemoryUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    await expect(deleteUserUseCase.execute('non-existing-user-id')).rejects.toThrow();
  });
});
