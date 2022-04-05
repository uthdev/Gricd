import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from './category.model';


export interface IBook extends Document {
  title: string;
  synopsis: string;
  // categories: [ICategory['_id']];
  category: ICategory['_id'];
  imageUrl: string;
  author: string;
  published: number;
  publishers: [string];
  isbn: string;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    category: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: 'category' 
    },
    imageUrl: { type: String },
    author: { type: String, required: true},
    published: { type: Number },
    publishers: [{ type: String }],
    isbn: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("book", BookSchema);