import { Response, Request } from 'express';
import { checkNeedExists, checkValues } from '../../../utils/validator';
import { findWorkoutService, updateWorkoutService } from '../../../services/workouts';
import { ErrorMessage } from '../../../utils/error';

interface IQuery {
  workoutId: string;
}

export async function finishWorkoutController(req: Request, res: Response) {
  const { workoutId } = req.query as any as IQuery;

  // #region VALIDATIONS
  checkValues([{ label: 'ID do treino', type: 'string', value: workoutId }]);

  const workout = await findWorkoutService({
    where: {
      id: workoutId,
      userId: req.user.id,
    },
  });

  checkNeedExists([{ label: 'Treino', value: workout }]);

  if (workout?.finalDateTime) {
    throw new ErrorMessage({
      message: 'Treino já finalizado!',
      statusCode: '400 BAD REQUEST',
    });
  }

  // #endregion

  await updateWorkoutService({
    data: {
      finalDateTime: new Date(),
    },
    where: {
      id: workoutId,
    },
  });

  return res.status(200).json({ message: 'Treino finalizado com sucesso!' });
}
