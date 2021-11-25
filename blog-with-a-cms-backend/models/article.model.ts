import mongoose, { Schema } from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    ratings: [],
    comments: [],
    numbersSeen: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
