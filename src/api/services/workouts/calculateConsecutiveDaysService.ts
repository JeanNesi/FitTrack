import { prisma } from '../../../../prisma';

export async function calculateConsecutiveDaysService({ userId }: { userId: string }) {
  const workouts = await prisma.workout.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    orderBy: {
      initialDateTime: 'desc',
    },
  });

  if (!workouts.length) return 0;

  let consecutiveDays = 1;
  let previousDate = new Date(workouts[0].initialDateTime);

  // Iterar sobre os treinos a partir do segundo treino
  for (let i = 0; i < workouts.length; i++) {
    const currentDate = new Date(workouts[i].initialDateTime);

    previousDate.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);

    // Calcular a diferença em milissegundos entre as datas
    const diffTime = Math.abs((currentDate as any) - (previousDate as any));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) consecutiveDays++;

    if (diffDays > 1) break;

    previousDate = currentDate;
  }

  return consecutiveDays;
}
