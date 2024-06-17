import { $Enums } from '@prisma/client';
import { Response, Request } from 'express';
import { checkEnums, checkValues } from '../../../utils/validator';
import { createWorkoutService, findWorkoutService } from '../../../services/workouts';
import { ErrorMessage } from '../../../utils/error';

interface IBody {
  name: string;
  description: string;
  workoutType: $Enums.WorkoutsType;
}

export async function startWorkoutController(req: Request, res: Response) {
  const { name, description, workoutType } = req.body as IBody;

  // #region VALIDATIONS
  checkValues([
    { label: 'Nome', type: 'string', value: name },
    { label: 'Descrição', type: 'string', value: description, required: false },
  ]);

  checkEnums([
    {
      enums: $Enums.WorkoutsType,
      label: 'Tipo do treino',
      value: workoutType,
    },
  ]);

  const haveUnfinishedWorkout = await findWorkoutService({
    where: {
      userId: req.user.id,
      finalDateTime: null,
    },
  });

  if (haveUnfinishedWorkout) {
    throw new ErrorMessage({
      message: 'Você já possui um treino em andamento!',
      statusCode: '400 BAD REQUEST',
    });
  }

  // #endregion

  const { id } = await createWorkoutService({
    data: {
      name,
      description,
      workoutType,
      initialDateTime: new Date(),
      userId: req.user.id,
    },
  });

  return res.status(201).json({ message: 'Treino iniciado com sucesso!', workoutId: id });
}
