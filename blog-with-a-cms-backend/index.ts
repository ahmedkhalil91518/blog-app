import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import createUserController from './controllers/createUser.controller';
import createTagController from './controllers/createTag.controller';
import createArticleController from './controllers/createArticle.controller';
import createCommentController from './controllers/createComment.controller';
import createRatingController from './controllers/createRating.controller';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

  app.post('/api/create-user', createUserController);
  app.post('/api/create-tag', createTagController);
  app.post('/api/create-article', createArticleController);
  app.post('/api/create-comment', createCommentController);
  app.post('/api/create-rating', createRatingController);
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
