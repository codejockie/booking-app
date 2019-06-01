import { compareSync, genSalt, hash, hashSync } from "bcrypt";
import { Document, Error, model, Model, Schema } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
}

export const UserSchema = new Schema({
  email: { index: { unique: true }, type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.method("comparePassword", function(password: string): boolean {
  return compareSync(password, this.password);
});

UserSchema.static("hashPassword", (password: string): string => {
  return hashSync(password, 10);
});

UserSchema.pre<IUser>("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    hash(this.password, salt, (error: Error, passwordHash) => {
      if (error) {
        return next(error);
      }
      this.password = passwordHash;
      next();
    });
  });
});

export const User: IUserModel = model<IUser, IUserModel>("User", UserSchema);
