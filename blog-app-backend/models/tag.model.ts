import mongoose, { Schema } from 'mongoose';

const tagSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag