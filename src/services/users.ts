import { LoginDto, RegisterDto } from "../typs/dto/user";
import User from "../models/user";
import { compare, hash } from "bcrypt";

export const userLogin = async (user: LoginDto) => {
  try {
    const userFromDatabase = await User.findOne({ username: user.username });
    if (!userFromDatabase) throw new Error("user not found");
    const match = await compare(user.password, userFromDatabase.password);
    if (!match) throw new Error("wrong password");
    return userFromDatabase;
  } catch (err) {
    throw err;
  }
};

export const createNewUser = async (user: RegisterDto) => {
  try {
    console.log({user})
    const encPass = await hash(user.password, 10);
    user.password = encPass;
    const newUser = new User(user);
    return await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Can't create new user");
  }
};
