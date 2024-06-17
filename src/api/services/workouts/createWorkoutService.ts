import { IPrisma, prisma } from '../../../../prisma';

export async function createWorkoutService<T extends IPrisma.WorkoutCreateArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.WorkoutCreateArgs>,
) {
  return prisma.workout.create(args);
}
