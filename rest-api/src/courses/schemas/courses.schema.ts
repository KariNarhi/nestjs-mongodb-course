import { Schema } from 'mongoose';
import { Course } from '../../../../shared/course';

export const CoursesSchema = new Schema<Course>({
  seqNo: { type: Number, required: true },
  url: String,
  iconUrl: String,
  courseListIcon: String,
  description: String,
  longDescription: String,
  category: String,
  lessonsCount: Number,
  promo: Boolean,
});
