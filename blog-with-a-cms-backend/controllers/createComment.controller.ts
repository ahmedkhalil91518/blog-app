import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Article from '../models/article.model';

export default (req: Request, res: Response) => {
  User.findById(req.body.userId, function (err: unknown, user: unknown) {
    const data = {
      _id: new mongoose.Types.ObjectId(),
      author: user,
      commentText: req.body.commentText,
      parentId: req.body.parentId,
      depth: req.body.depth,
      postedDate: Date.now,
    };
    Article.findOneAndUpdate(
      { _id: req.body.articleId },
      {
        $push: {
          comments: data,
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
