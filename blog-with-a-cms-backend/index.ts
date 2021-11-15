import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import createUserController from './controllers/createUser.controller'

dotenv.config();
const app = express();
const PORT = 8000;

main().catch((err) => console.log(err));

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

  app.get('/',createUserController)
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
