import { prisma, IPrisma } from '../../../../prisma';

export async function findWorkoutService<T extends IPrisma.WorkoutFindFirstArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.WorkoutFindFirstArgs>,
) {
  const workout = await prisma.workout.findFirst<T>(args);

  return workout;
}
