import { IPrisma, prisma } from '../../../../prisma';

export function findAccessLogs(where: IPrisma.UserAccessLogsWhereInput) {
  return prisma.userAccessLogs.findFirst({ where });
}
