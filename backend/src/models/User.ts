import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'super-admin' | 'editor' | 'media-manager';
  active: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['super-admin', 'editor', 'media-manager'],
      default: 'editor'
    },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date }
  },
  {
    timestamps: true
  }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
