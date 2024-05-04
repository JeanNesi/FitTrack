import { prisma, IPrisma } from '../../../../prisma';
import { checkNeedExists } from '../../utils/validator';

export async function findUserMissionService<T extends IPrisma.UserMissionFindUniqueArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.UserMissionFindUniqueArgs>,
) {
  const usermission = await prisma.userMission.findUnique<T>(args);

  checkNeedExists([{ label: 'Usuários', value: usermission }]);

  return usermission!;
}
