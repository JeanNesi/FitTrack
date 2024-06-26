import { sign } from 'jsonwebtoken';
import 'dotenv/config';

export async function generateToken(data: any) {
  const secret: any = process.env.JWT_SECRET;

  return sign(data, secret, { expiresIn: '8h' });
}
