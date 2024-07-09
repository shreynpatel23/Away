import mongoose, { Schema, Document, Model } from "mongoose";

// User interface
interface IUser extends Document {
  email: string;
  first_name: string;
  last_name: string;
  isPaidUser: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  isPaidUser: { type: Boolean, required: true },
});

// model

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
export type { IUser };
