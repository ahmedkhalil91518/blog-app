import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/article.model';
import Tag from '../models/tag.model';
import User from '../models/user.model';

export default (req: Request, res: Response) => {
  let tags1: any;
  let author: any;
  let article: any;
  Tag.find(
    {
      _id: { $in: req.body.tagId },
    },
    function (err: any, tag: any) {
      tags1 = tag;
      User.findById(req.body.userId, function (err: any, user: any) {
        author = user;
        article = new Article({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          tags: tags1,
          content: req.body.content,
          author: author,
          ratings: null,
        });
        article.save();
        res.send(article);
      });
    }
  );
};
