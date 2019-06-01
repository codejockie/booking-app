import { User } from "./models/User";

export const seedUsers = async () => {
  const email = "jk@testapp.com";
  const user = await User.findOne({ email });
  if (!user) {
    new User({
    email,
    name: "JK",
    password: "passed!",
  }).save();
  }
};
