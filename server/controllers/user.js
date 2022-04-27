import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import { uid } from "uid";

dotenv.config();

export const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  //Attempt to find an existing user with the provided email
  const existingUser = await User.findOne({ email });
  //If found, return an error
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });
  //If passwords don't match, return an error
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  //generate unique Account ID for user
  //Note for refactor down the road: The Account Id will be the same
  // across all users of the same "team" or account.

  const generateUniqueAccountId = async () => {
    let randomNum = uid();

    const existingAccountId = await User.findOne({
      accountId: randomNum,
    });
    if (existingAccountId) {
      generateUniqueAccountId();
    } else {
      return randomNum;
    }
  };

  let accountUniqueId = await generateUniqueAccountId();

  //Hash password prior to storing
  const hashedPassword = await bcrypt.hash(password, 12);
  //Create a new user
  const newUser = await User.create({
    email,
    password: hashedPassword,
    accountId: accountUniqueId,
  });
  //Create JWToken for user so we can sign them in after sign up
  const token = jwt.sign(
    { email: newUser.email, id: newUser._id },
    process.env.JWTSECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ result: newUser, token });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //attempt to find a user in the DB that matches the req.body.email
    const existingUser = await User.findOne({ email });

    //If user not found, return an error message
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    //check to see if password provided matches hashed password in DB

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    //logic if password is not correct

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //If user exists, and password is correct, get a JWT to send to front end

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
