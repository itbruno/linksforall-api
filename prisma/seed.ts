import { encryptString } from '@/utils/encryptString';
import {fakerPT_BR as faker} from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.users.create({
    data: {
      email: faker.internet.email(),
      fullname: faker.person.fullName(),
      password: (await encryptString(faker.internet.password()))
    }
  });

  return user;
}

async function createPage({userId}: { userId: string}) {
  const page = await prisma.pages.create({
    data: {
      slug: faker.lorem.slug(2),
      userId
    }
  });

  return page;
}

async function seed() {
  const users = await Promise.all([
    await createUser(),
    await createUser(),
    await createUser(),
    await createUser()
  ]);

  console.log(users[0].id, users[1].id);

  const pages = await Promise.all([
    await createPage({ userId: users[0].id}),
    await createPage({ userId: users[1].id}),
    await createPage({ userId: users[2].id}),
    await createPage({ userId: users[3].id})
  ]);
}

seed().then( async () => {
  await prisma.$disconnect();
}).catch( async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit();
});
