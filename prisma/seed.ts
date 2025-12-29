import { prisma } from '@/lib/prisma';
import { encryptString } from '@/utils/encrypt-string';
import {fakerPT_BR as faker} from '@faker-js/faker';

async function createUser(role: 'ADMIN' | 'USER'  = 'USER') {
  const data = {
    email: faker.internet.email(),
    fullname: faker.person.fullName(),
    password: (await encryptString('123456')),
    role
  };

  const user = await prisma.users.create({
    data
  });

  return user;
}

async function createPage({userId}: { userId: string}) {

  const page = await prisma.pages.create({
    data: {
      title: faker.lorem.words(5),
      description: faker.lorem.text(),
      slug: faker.lorem.slug(2),
      userId: userId.toString()
    }
  });

  return page;
}

async function seed() {
  const users = await Promise.all([
    await createUser('ADMIN'),
    await createUser(),
    await createUser(),
    await createUser()
  ]);

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
