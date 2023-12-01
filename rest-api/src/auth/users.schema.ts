import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
  email: String,
  roles: Array,
  passwordHash: String,
});
