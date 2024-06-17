import { IPrisma, prisma } from '../../../../prisma';
import { findWorkoutService } from './findWorkoutService';

export async function updateWorkoutService<T extends IPrisma.WorkoutUpdateArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.WorkoutUpdateArgs>,
) {
  await findWorkoutService({ where: { id: args.where.id || '' } });

  return prisma.workout.update(args);
}
