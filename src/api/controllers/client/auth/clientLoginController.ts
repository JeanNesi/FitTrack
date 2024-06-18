import { parse } from 'useragent';
import { Response, Request } from 'express';
import { compare } from 'bcrypt';
import { generateToken } from '../../../utils/token';
import { checkValues } from '../../../utils/validator';
import { findUser } from '../../../services/users';
import { ErrorMessage } from '../../../utils/error';
import { createAccessLog, updateAccessLog } from '../../../services/accessLogs';

export async function clientLoginController(req: Request, res: Response) {
  const { email, password } = req.body;

  const agent = parse(req.headers['user-agent']);

  const accessLog = await createAccessLog({
    ipAddress: req.ip,
    browser: agent.source,
    OS: agent.os.family,
  });

  // #region VALIDATIONS
  checkValues([
    { label: 'Email', type: 'string', value: email },
    { label: 'Senha', type: 'string', value: password },
  ]);

  const user = await findUser({ where: { email: { equals: email, mode: 'insensitive' } } });

  if (!user) {
    throw new ErrorMessage({
      message: 'Usuário ou senha incorretos',
      statusCode: '401 UNAUTHORIZED',
    });
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    throw new ErrorMessage({
      message: 'Usuário ou senha incorretos',
      statusCode: '401 UNAUTHORIZED',
    });
  }

  if (user.isBlocked) {
    throw new ErrorMessage({
      message: 'Sua conta está bloqueada. Entre em contato com a FitTrack para mais informações',
      statusCode: '403 FORBIDDEN',
    });
  }

  // #endregion

  await updateAccessLog({ data: { userId: user.id }, where: { id: accessLog.id } });

  const token = await generateToken({ user: { id: user.id } });

  return res
    .status(200)
    .json({ token, username: user.username, profilePicture: user.profilePicture });
}
