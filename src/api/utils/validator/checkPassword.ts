import { ErrorMessage } from '../error';

export function checkPassword({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  if (password !== confirmPassword) {
    throw new ErrorMessage({
      message: 'As senhas precisam ser iguais',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  if (password.length < 6) {
    throw new ErrorMessage({
      message: 'A senha precisa ter pelo menos 6 dígitos',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }
}
