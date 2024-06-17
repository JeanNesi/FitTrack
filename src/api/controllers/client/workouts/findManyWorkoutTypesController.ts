import { $Enums } from '@prisma/client';
import { Request, Response } from 'express';

const workoutTypesLabels: {
  [key: string]: string;
} = {
  CARDIO: 'Cardio',
  STRENGTH: 'Força',
  FLEXIBILITY: 'Flexibilidade',
  BALANCE: 'Equilíbrio',
  ENDURANCE: 'Resistência',
  POWER: 'Potência',
  SPEED: 'Velocidade',
  AGILITY: 'Agilidade',
  PLYOMETRICS: 'Pliometria',
  FUNCTIONAL: 'Funcional',
  HIIT: 'Treinamento Intervalado de Alta Intensidade',
  CIRCUIT: 'Circuito',
  TABATA: 'Tabata',
  INTERVAL: 'Intervalo',
  CROSSFIT: 'Crossfit',
  CALISTHENICS: 'Calistenia',
  BODYWEIGHT: 'Peso Corporal',
  WEIGHTLIFTING: 'Levantamento de Peso',
  BODYBUILDING: 'Musculação',
  YOGA: 'Yoga',
  PILATES: 'Pilates',
  BARRE: 'Barra',
  DANCE: 'Dança',
  MARTIAL_ARTS: 'Artes Marciais',
  BOXING: 'Boxe',
  KICKBOXING: 'Kickboxing',
  MUAY_THAI: 'Muay Thai',
  JIU_JITSU: 'Jiu-Jitsu',
  WRESTLING: 'Luta Livre',
  MMA: 'MMA',
  FITNESS: 'Fitness',
  SPORTS: 'Esportes',
  REHABILITATION: 'Reabilitação',
  PHYSIOTHERAPY: 'Fisioterapia',
  OTHER: 'Outro',
};
export async function findManyWorkoutTypesController(_req: Request, res: Response) {
  const workoutTypes = Object.keys($Enums.WorkoutsType).map((name: string) => ({
    value: name,
    label: workoutTypesLabels[name],
  }));

  return res.status(200).json({
    workoutTypes,
  });
}
