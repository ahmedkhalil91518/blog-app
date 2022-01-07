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
    { $inc: { numbersSeen: 1 } }
  )
    .populate("author")
    .populate("tags")
    .exec(function (err, article) {
      if (err) return console.log(err);
      console.log("The author is %s");
      res.send(article);
    });
};

export const readAllArticlesWithACertainTag = async (
  req: Request,
  res: Response
) => {
  Article.find({ tags: { $elemMatch: { $eq: req.query.tagId } } })
    .populate("author")
    .populate("tags")
    .exec(function (err, article) {
      if (err) return console.log(err);
      console.log("The author is %s");
      res.send(article);
    });
};

export const readAllArticles = async (req: Request, res: Response) => {
  Article.find({})
    .populate("author")
    .populate("tags")
    .exec(function (err, article) {
      if (err) return console.log(err);
      res.send(article);
    });
};

export const uploadArticleMainImage = (
  req: Request,
  res: Response,
  next: any
) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    return next(error);
  }
  res.status(200).send({
    statusCode: 200,
    status: "success",
    uploadedFile: file,
  });
};
