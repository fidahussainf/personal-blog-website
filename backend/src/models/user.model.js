import mongoose from 'mongoose';
import bcrypt from 'bcrypt';  
import { Role } from '../constant/index.js';

const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true, match: /.+\@.+\..+/ },
    password: {
      type: String,
      required: true,
      set: (password) => bcrypt.hashSync(password, 10),
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
      default: Role.USER,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userModel);
export default User;
