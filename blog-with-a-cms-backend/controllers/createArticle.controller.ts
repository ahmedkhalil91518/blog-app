import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/article.model';
import Tag from '../models/tag.model';
import User from '../models/user.model';

export default (req: Request, res: Response) => {
  Tag.find(
    {
      _id: { $in: req.body.tagId }, // tagId is an array
    },
    function (err, tag) {
      User.findById(req.body.userId, function (err: unknown, user: unknown) {
        const article = new Article({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          tags: tag,
          content: req.body.content,
          author: user,
          ratings: [],
          comments: [],
        });
        article.save();
        res.send(article);
      });
    }
  );
};