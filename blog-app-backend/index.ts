import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fileExtension = require("file-extension");
import * as userController from "./controllers/user.controller";
import * as tagController from "./controllers/tag.controller";
import * as articleController from "./controllers/article.controller";
import * as commentController from "./controllers/comment.controller";
import * as ratingController from "./controllers/rating.controller";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Storage
const storage = multer.diskStorage({
  // Setting directory on disk to save uploaded files
  destination: function (_req, file, cb) {
    cb(null, "uploadedFiles");
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + fileExtension(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    // Setting Image Size Limit to 5MBs
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //Error
      cb(new Error("Please upload JPG and PNG images only!"));
    }
    //Success
    cb(null, true);
  },
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

  app.post("/api/create-user", userController.createUser);
  app.post("/api/create-tag", tagController.createTag);
  app.post("/api/create-article", articleController.createArticle);
  app.post("/api/create-comment", commentController.createComment);
  app.post("/api/create-rating", ratingController.createRating);
  app.get("/api/read-article/:articleId", articleController.readArticle);
  app.get(
    "/api/read-all-articles-with-a-certain-tag/",
    articleController.readAllArticlesWithACertainTag
  );
  app.get("/api/read-user/:userId", userController.readUser);
  app.get("/api/read-all-articles/", articleController.readAllArticles);
  app.post(
    "/api/uploadfile",
    upload.single("uploadedImage"),
    articleController.uploadArticleMainImage,
    (error: any, req: any, res: any, next: any) => {
      res.status(400).send({
        error: error.message,
      });
    }
  );
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
