import { STATUS_NOTIFICATION_CLASSROOM } from '../utillities/constants';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const classroomNotificationSchema = new Schema(
  {
    content: {
      type: String,
      required: false
    },
    classroom: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Classroom'
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: STATUS_NOTIFICATION_CLASSROOM.PENDING
    }
  },
  {
    timestamps: true
  }
);

export const ClassroomNotificationModel = mongoose.model('ClassroomNotification', classroomNotificationSchema);

