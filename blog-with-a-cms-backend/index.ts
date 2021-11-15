import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import createUserController from './controllers/createUser.controller';
import createTagController from './controllers/createTag.controller';
import createArticleController from './controllers/createArticle.controller';

dotenv.config();
const app = express();
const PORT = 8000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

main().catch((err) => console.log(err));

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

  app.post('/api/create-user', createUserController);
  app.post('/api/create-tag', createTagController);
  app.post('/api/create-article', createArticleController);
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
