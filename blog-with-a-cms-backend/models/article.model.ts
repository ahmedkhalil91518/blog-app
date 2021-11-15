import mongoose, { Schema } from 'mongoose';
import Populate from '../utilities/autoPopulate';

const articleSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

articleSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('tags'))
  .pre('find', Populate('tags'))
  .pre('findOne', Populate('ratings'))
  .pre('find', Populate('ratings'));

const Article = mongoose.model('Article', articleSchema);

export default Article;
