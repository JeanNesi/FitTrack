import { parse } from 'useragent';
import { Response, Request } from 'express';
import { hashSync } from 'bcrypt';
import { generateToken } from '../../../utils/token';
import { checkValues } from '../../../utils/validator';
import { createUser, findUser } from '../../../services/users';
import { ErrorMessage } from '../../../utils/error';
import { createAccessLog, updateAccessLog } from '../../../services/accessLogs';
import { createInitialsAvatar } from '../../../utils/api';

interface IBody {
  email: string;
  username: string;
  password: string;
}

export async function clientRegisterController(req: Request, res: Response) {
  const { email, username, password } = req.body as IBody;

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
    { label: 'Nome de usuário', type: 'string', value: username },
  ]);

  const checkEmail = await findUser({ where: { email: { equals: email, mode: 'insensitive' } } });

  if (checkEmail) {
    throw new ErrorMessage({
      message: 'E-mail já cadastrado.',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  const checkUsername = await findUser({
    where: { username: { equals: username, mode: 'insensitive' } },
  });

  if (checkUsername) {
    throw new ErrorMessage({
      message: 'Nome de usuário já cadastrado.',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  if (password.length < 8) {
    throw new ErrorMessage({
      message: 'A senha deve possuir mais do que 8 dígitos',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  // #endregion

  const user = await createUser({
    data: {
      email,
      password: hashSync(password, 12),
      username,
      profilePicture: createInitialsAvatar(username),
    },
  });

  await updateAccessLog({ data: { userId: user.id }, where: { id: accessLog.id } });

  const token = await generateToken({ user: { id: user.id } });

  return res
    .status(200)
    .json({ token, username: user.username, profilePicture: user.profilePicture });
}
