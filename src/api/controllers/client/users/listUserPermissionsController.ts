import { Request, Response } from 'express';
import { findManyPermissions } from '../../../services/permissions';

export async function listUserPermissionsController(_req: Request, res: Response) {
  const list = await findManyPermissions({
    select: { name: true, label: true },
    orderBy: { label: 'asc' },
  });

  return res.status(200).json({ list });
}
