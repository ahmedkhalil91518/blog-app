import mongoose, { Schema } from 'mongoose';

const articleSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      rating: { $in: [1, 2, 3, 4, 5] },
    },
  ],
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
