import { Schema, model, connect } from "mongoose";

try {
  connect(
    "mongodb+srv://ismail:FzkI2loxP8WvYkkJ@cluster0.sgx71cc.mongodb.net/?retryWrites=true&w=majority"
  );
} catch (err) {
  console.log("Error : ", err);
}
// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  email: string;
  age?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

async function run() {
  // 4. Connect to MongoDB
  await connect(
    "mongodb+srv://ismail:FzkI2loxP8WvYkkJ@cluster0.sgx71cc.mongodb.net/?retryWrites=true&w=majority"
  );

  const ME = new User({
    username: "ismail",
    email: "ismail@here.where",
    age: 23,
    role: "Full stack",
  });

  await ME.save();

  console.log(ME.email); // ismail@here.where
}

//run and catch if error
run().catch((err) => console.log(err));

/* async function showUser() {
  console.log(await User.find());
}

showUser();
 */
