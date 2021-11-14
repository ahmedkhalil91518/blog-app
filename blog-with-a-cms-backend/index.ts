import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = 8000;

main().catch((err) => console.log(err));

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    summary: String,
  });
  const User = mongoose.model('User', userSchema);
  app.get('/', async (req, res) => {
    const user = new User({
      firstName: 'String3',
      lastName: 'String',
      email: 'String',
      password: 'String',
      role: 'String',
      summary: 'String',
    });
    await user.save();
    res.send(user);
  });
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
