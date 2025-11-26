import bcrypt from 'bcrypt';

async function encryptString(str: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  const encryptedString = await bcrypt.hash(str, salt);

  return encryptedString;
}

export { encryptString };
