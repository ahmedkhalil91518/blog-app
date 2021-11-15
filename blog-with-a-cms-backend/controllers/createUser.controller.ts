import { Request, Response } from 'express';
import User from '../models/user.model';

export default async (req: Request, res: Response) => {
    const user = new User({
      firstName: 'String5',
      lastName: 'String',
      email: 'String',
      password: 'String',
      role: 'String',
      summary: 'String',
    });
    await user.save();
    res.send(user);
  };