/* eslint-disable no-console */
import { hashSync } from 'bcrypt';
import { prisma } from '../prismaConfig';
import { createInitialsAvatar } from '../../src/api/utils/api';

const defaultUserEmail = process.env.DEFAULT_USER_EMAIL;
const defaultUserPassword = process.env.DEFAULT_USER_PASSWORD;

export async function upsertDefaultUser() {
  if (!defaultUserEmail || !defaultUserPassword) {
    return console.log('Email e senha de admin não foram definidas');
  }

  const { id } = await prisma.user.upsert({
    create: {
      email: defaultUserEmail,
      password: hashSync(defaultUserPassword, 12),
      username: 'kaua_librelato',
      profilePicture: createInitialsAvatar('kaua_librelato'),
      UserPermission: { create: { permission: { connect: { name: 'admin' } } } },
    },
    update: {},
    where: { email: defaultUserEmail },
  });

  const missions = await prisma.mission.findMany({
    select: { id: true },
  });

  const userMissions = await prisma.userMission.findMany({
    select: { id: true, missionId: true },
    where: {
      missionId: { in: missions.map((mission) => mission.id) },
      userId: id,
    },
  });

  await prisma.$transaction(
    missions.map((mission) =>
      prisma.userMission.upsert({
        create: {
          userId: id,
          missionId: mission.id,
        },
        update: {},
        where: {
          id: userMissions.find((userMission) => userMission.missionId === mission.id)?.id || '',
        },
      }),
    ),
  );

  return null;
}
