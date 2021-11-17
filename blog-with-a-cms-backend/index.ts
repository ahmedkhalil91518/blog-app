import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as userController from './controllers/user.controller';
import * as tagController from './controllers/tag.controller';
import * as articleController from './controllers/article.controller';
import * as commentController from './controllers/comment.controller';
import * as ratingController from './controllers/rating.controller';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

  app.post('/api/create-user', userController.createUser);
  app.post('/api/create-tag', tagController.createTag);
  app.post('/api/create-article', articleController.createArticle);
  app.post('/api/create-comment', commentController.createComment);
  app.post('/api/create-rating', ratingController.createRating);
  app.get('/api/read-article/:articleId', articleController.readArticle);
  app.get('/api/read-all-articles-with-a-certain-tag/', articleController.readAllArticlesWithACertainTag);
  app.get('/api/read-user/:userId', userController.readUser);
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
