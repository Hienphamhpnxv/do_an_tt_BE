import mongoose, { Types } from 'mongoose';
import { STATUS_ACTIVE_CLASSROOM } from '../utillities/constants';

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  mentor: [
    {
      type: mongoose.Types.ObjectId,
      required: true
    }
  ],
  description: {
    type: String
  },
  statusActive: {
    type: Number,
    default: STATUS_ACTIVE_CLASSROOM.PENDING
  }
});

export const ClassroomModel = mongoose.model('Classroom', classroomSchema);

