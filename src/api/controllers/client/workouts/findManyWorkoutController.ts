import { Request, Response } from 'express';
import { checkIfNaN, checkValues } from '../../../utils/validator';
import { forceAbsoluteNumber } from '../../../utils/dataHandler';
import { listWorkoutService } from '../../../services/workouts';

interface IBody {
  filter: string;
  page: string;
  take: string;
  completedWorkouts: boolean;
}

export async function findManyWorkoutController(req: Request, res: Response) {
  const { filter, page, take, completedWorkouts } = req.body as any as IBody;

  // #region VALIDATIONS

  checkValues([
    {
      label: 'Treinos completos',
      type: 'boolean',
      value: completedWorkouts,
      required: false,
    },
  ]);

  checkIfNaN([
    { label: 'Número de registros', number: take },
    { label: 'Página', number: page },
  ]);

  // #endregion

  const { workouts, count } = await listWorkoutService({
    page: forceAbsoluteNumber(page || '1'),
    take: forceAbsoluteNumber(take || '20'),
    filter,
    completedWorkouts,
  });

  return res.status(200).json({ workouts, count });
}
