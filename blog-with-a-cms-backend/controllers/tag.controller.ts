import { Request, Response } from 'express';
import Tag from '../models/tag.model';
import mongoose from 'mongoose';

export const createTag = async (req: Request, res: Response) => {
  const tag = new Tag({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  await tag.save();
  res.send(tag);
};
