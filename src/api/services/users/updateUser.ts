import { IPrisma, prisma } from '../../../../prisma';

export async function updateUser(args: IPrisma.UserUpdateArgs) {
  return prisma.user.update(args);
}
