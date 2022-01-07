import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    summary: req.body.summary,
  });
  await user.save();
  res.send(user);
};

export const readUser = async (req: Request, res: Response) => {
  User.findOne({ _id: req.params.userId }, (err: any, user: any) => {
    res.send(user);
  });
};
