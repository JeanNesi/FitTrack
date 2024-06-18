import { Response, Request } from 'express';
import { checkNeedExists, checkValues } from '../../../utils/validator';
import { findWorkoutService, updateWorkoutService } from '../../../services/workouts';
import { ErrorMessage } from '../../../utils/error';
import { getMinutesBetweenDates } from '../../../utils/dateTime';

interface IBody {
  workoutId: string;
  description: string;
}

export async function finishWorkoutController(req: Request, res: Response) {
  const { workoutId, description } = req.body as IBody;

  // #region VALIDATIONS
  checkValues([
    { label: 'ID do treino', type: 'string', value: workoutId },
    {
      label: 'Descrição',
      type: 'string',
      value: description,
      required: false,
    },
  ]);

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

  const initalDateTime = workout!.initialDateTime;
  const finalDateTime = new Date();
  const totalTime = getMinutesBetweenDates(initalDateTime, finalDateTime);

  await updateWorkoutService({
    data: {
      description,
      finalDateTime,
      totalTime,
    },
    where: {
      id: workoutId,
    },
  });

  return res.status(200).json({ message: 'Treino finalizado com sucesso!' });
}
