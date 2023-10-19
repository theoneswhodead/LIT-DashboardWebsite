import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDoc } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: UserDoc;
    }
  }
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  console.log(authorization)

  if (!authorization) {
    return res.status(401).json({ error: 'Wymagany token uwierzytelniający' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET) as { _id: string };

    const user: UserDoc | null = await User.findOne({ _id }).select('_id');

    if (!user) {
      return res.status(401).json({ error: 'Nie znaleziono użytkownika' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Zapytanie nie jest uwierzytelnione' });
  }
};

export default requireAuth;
