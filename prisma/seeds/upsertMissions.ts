import { prisma } from '../prismaConfig';

export async function upsertMissions() {
  const missions = [
    {
      title: 'Dobre o peso inicial',
      description: 'Dobre o peso inicial em algum exercício durante sua sessão de treino.',
      experiencePoints: 100,
    },
    {
      title: '5 horas de treino',
      description: 'Complete um total de 5 horas de treino ao longo de uma semana.',
      experiencePoints: 300,
    },
    {
      title: 'Flexões até a falha',
      description: 'Faça 3 séries de flexões até a falha muscular.',
      experiencePoints: 80,
    },
    {
      title: 'Alongamento diário',
      description: 'Realize 10 minutos de alongamento todas as manhãs durante uma semana.',
      experiencePoints: 50,
    },
    {
      title: 'Corrida de 3 km',
      description: 'Corra 3 km em menos de 20 minutos.',
      experiencePoints: 150,
    },
    {
      title: 'Aumento de repetições',
      description:
        'Aumente o número de repetições em qualquer exercício em 50% em comparação com sua última sessão.',
      experiencePoints: 120,
    },
    {
      title: 'Agachamentos com peso',
      description: 'Realize um conjunto de agachamentos com 75% do seu peso corporal.',
      experiencePoints: 90,
    },
    {
      title: 'Aula de Yoga',
      description: 'Complete uma aula de yoga de 1 hora.',
      experiencePoints: 70,
    },
    {
      title: '100 abdominais',
      description: 'Faça 100 abdominais em uma única sessão.',
      experiencePoints: 80,
    },
    {
      title: 'Levantamento terra',
      description: 'Levante 1,5x seu peso corporal em um levantamento terra.',
      experiencePoints: 200,
    },
    {
      title: 'Caminhada de 10 km',
      description: 'Complete uma caminhada de 10 km.',
      experiencePoints: 120,
    },
    {
      title: 'Cardio intenso',
      description: 'Realize 30 minutos de cardio intenso.',
      experiencePoints: 100,
    },
    {
      title: 'Mantenha a prancha',
      description: 'Mantenha uma prancha por 2 minutos.',
      experiencePoints: 60,
    },
    {
      title: 'Treino HIIT',
      description: 'Faça 20 minutos de treino de alta intensidade (HIIT).',
      experiencePoints: 90,
    },
    {
      title: 'Treino de corpo inteiro',
      description: 'Complete 4 sessões de treino de corpo inteiro em uma semana.',
      experiencePoints: 200,
    },
    {
      title: '50 flexões',
      description: 'Realize 50 flexões em um conjunto.',
      experiencePoints: 120,
    },
    {
      title: 'Ciclismo de 5 km',
      description: 'Faça 5 km de ciclismo em menos de 15 minutos.',
      experiencePoints: 150,
    },
    {
      title: 'Ritmo cardíaco elevado',
      description: 'Mantenha um ritmo cardíaco elevado por 30 minutos.',
      experiencePoints: 80,
    },
    {
      title: 'Circuito de treino',
      description: 'Complete um circuito de treino de 20 minutos.',
      experiencePoints: 100,
    },
    {
      title: 'Treino de flexibilidade',
      description: 'Faça uma sessão de treino de flexibilidade de 30 minutos.',
      experiencePoints: 70,
    },
  ];

  await prisma.$transaction(
    missions.map((mission) =>
      prisma.mission.upsert({
        create: mission,
        update: {},
        where: { title: mission.title },
      }),
    ),
  );
}
