import { findAccessLogs } from '../api/services/accessLogs';
import { updateUser } from '../api/services/users';
import { findManyUsers } from '../api/services/users/findManyUsers';
import { removeDays } from '../api/utils/dateTime';

export async function blockUnactiveUsers() {
  const users = await findManyUsers({ where: { isBlocked: false } });

  const lastMonth = removeDays({ date: new Date(), days: 30 });

  for (let index = 0; index < users.length; index++) {
    const user = users[index];

    const lastMonthUserAccess = await findAccessLogs({
      userId: user.id,
      createdAt: { gte: lastMonth },
    });

    if (!lastMonthUserAccess) {
      await updateUser({ data: { isBlocked: true }, where: { id: user.id } });
    }
  }
}
