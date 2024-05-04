import { schedule } from 'node-cron';
import { blockUnactiveUsers } from './blockUnactiveUsers';

export async function initCron() {
  schedule('0 0 * * *', async () => {
    await blockUnactiveUsers();
  });
}
