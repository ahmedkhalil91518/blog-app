import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Article from '../models/article.model';

export const createRating = (req: Request, res: Response) => {
  User.findById(req.body.userId, function (err: unknown, user: unknown) {
    const data = {
      _id: new mongoose.Types.ObjectId(),
      author: user,
      rating : req.body.rating
    };
    Article.findOneAndUpdate(
      { _id: req.body.articleId },
      {
        $push: {
            ratings: data,
        },
      },
      {
        new: true, //to return updated document
      }
    ).exec(function (error, data) {
      if (error) {
        return res
          .status(400)
          .send({ message: 'Failed to add comment due to invalid params!' });
      }
      return res.status(200).send(data);
    });
  });
};
