import { faker } from '@faker-js/faker/locale/pt_BR';
import { describe, expect, it } from 'vitest';
import { encryptString } from './encrypt-string';

describe('Utils: Encrypt string', () => {
  it('Should be able to hash string with bcrypt', async () => {
    const passwordString = faker.internet.password();
    const hashedPasswordString = await encryptString(passwordString);

    expect(hashedPasswordString.length).greaterThan(10);
    expect(hashedPasswordString).toEqual(expect.any(String));
    expect(hashedPasswordString.startsWith('$')).toBe(true);
  });
});
