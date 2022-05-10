import { Schema, model, Types } from 'mongoose';

const ClassroomDetailSchema = new Schema({
  members: [
    {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    }
  ],
  documents: [
    {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    }
  ]
});

