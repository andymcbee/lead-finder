import express from "express";
import {
  signup,
  signin,
  resetPassword,
  setNewPassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.post("/set-password", setNewPassword);

export default router;
