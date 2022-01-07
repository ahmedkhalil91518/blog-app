import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  summary: String,
});

const User = mongoose.model('User', userSchema);

export default User