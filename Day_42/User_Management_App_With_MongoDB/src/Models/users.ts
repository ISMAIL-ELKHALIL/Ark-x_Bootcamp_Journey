import { FilterQuery, Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const userModel = model<IUser>("User", userSchema);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => {
  return userModel.findOne({ email: email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  return userModel.findOne({ "authentication.sessionToken": sessionToken });
};

export const getUserById = (id: string) => {
  return userModel.findById(id);
};

export const createUser = async (values: Record<string, any>) => {
  return await new userModel(values).save().then((user) => user.toObject());
};

export const deleteUserById = (id: string) => {
  return userModel.findOneAndDelete({ _id: id });
};

export const updateUserById = (
  id: FilterQuery<IUser>,
  values: Record<string, any>
) => {
  return userModel.findOneAndUpdate(id, values);
};
