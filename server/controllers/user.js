import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import { uid } from "uid";
import mongoose from "mongoose";

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

//reset password

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    //console.log(email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      //Create unique secret for user
      const userSecret = process.env.JWTSECRET + existingUser._id;
      console.log(userSecret);

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser.password },
        userSecret,
        { expiresIn: "15m" }
      );

      const link = `http://localhost:3000/reset-password/${existingUser._id}/${token}`;
      console.log(link);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setNewPassword = async (req, res) => {
  const { password, confirmPassword, userId, jwt: token } = req.body;

  try {
    console.log(userId);

    //check to see if user ID is valid in MongoDB

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "No user matches ID" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //Lookup existing user from MongoDB
    const existingUser = await User.findOne({ _id: userId });

    console.log(existingUser);

    const decodedData = jwt.verify(
      token,
      process.env.JWTSECRET + existingUser._id
    );
    console.log(decodedData);
    if (existingUser.password !== decodedData.id) {
      return res.status(400).json({ message: "Link has expired." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await User.updateOne(
      { _id: userId },
      { password: hashedPassword },
      { new: true }
    );
    console.log("Updated user:::");
    console.log(updatedUser);

    return res.status(200).json({ message: "Updated password" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "There has been an error" });
  }

  //I need to update user's PW now...

  //console.log(decodedData.exp - decodedData.iat);

  //current time in seconds
  /* let timeNow = +new Date();

  console.log(Math.round(timeNow / 1000));
  console.log(decodedData.iat);

  console.log(decodedData.exp); */

  /*   if (decodedData.iat > decodedData.exp) {
    return res.status(404).send("Expired link. Request a new link.");
  } */

  // req.userId = decodedData?.id;
};
