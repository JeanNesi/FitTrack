import { IPrisma, prisma } from '../../../../prisma';

export function createAccessLog(data: IPrisma.UserAccessLogsCreateInput) {
  return prisma.userAccessLogs.create({ data });
}
