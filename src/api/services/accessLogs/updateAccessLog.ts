import { IPrisma, prisma } from '../../../../prisma';

export function updateAccessLog(data: IPrisma.UserAccessLogsUpdateArgs) {
  return prisma.userAccessLogs.update(data);
}
