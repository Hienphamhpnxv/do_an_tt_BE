import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    classroom: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Classroom'
    },
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export const DocumentModel = mongoose.model('Document', documentSchema);

