import { ObjectId } from 'mongodb';

import { Schema } from 'mongoose';

export const LessonsSchema = new Schema({
  description: String,
  duration: String,
  seqNo: Number,
  course: {
    type: ObjectId,
    ref: 'Course',
  },
});
