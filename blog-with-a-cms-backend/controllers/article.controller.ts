import { Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/article.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";

export const createArticle = (req: Request, res: Response) => {
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

export const readArticle = (req: Request, res: Response) => {
  Article.findOneAndUpdate(
    {
      _id: req.params.articleId,
    },
    { $inc: { numbersSeen: 1 } },
    (err: any, article: any) => {
      res.send(article);
    }
  );
};

export const readAllArticlesWithACertainTag = async (
  req: Request,
  res: Response
) => {
  Article.find(
    { tags: { $elemMatch: { $eq: req.query.tagId } } },
    (err: any, articles: any) => {
      res.send(articles);
    }
  );
};

export const readAllArticles = async (
  req: Request,
  res: Response
) => {
  Article.find(
    {},
    (err: any, articles: any) => {
      res.send(articles);
    }
  );
};