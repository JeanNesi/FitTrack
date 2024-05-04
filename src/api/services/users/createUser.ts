import { IPrisma, prisma } from '../../../../prisma';

export function createUser(args: IPrisma.UserCreateArgs) {
  return prisma.user.create(args);
}
